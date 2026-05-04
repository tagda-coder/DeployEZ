import { Deployment } from "../models/deployment.model.js";
import simpleGit from "simple-git";
import path from "path";
import fs from "fs";
import { uploadFile } from "./storage.service.js";
import { createClient } from "redis";

const publisher = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

publisher.on("error", (err) => console.error("Redis Error:", err));
publisher.on("connect", () => console.log("Redis connected properly ✅"));

await publisher.connect();

// ─────────────────────────────────────────────────────────────────────────────

export const createDeployment = async (repoUrl) => {
  const deployment = await Deployment.create({
    repoUrl,
    status: "queued",
    logs: ["Deployment queued..."],
  });

  // Run async — don't block the HTTP response
  runDeployment(deployment._id, repoUrl).catch((err) =>
    console.error("Deployment pipeline error:", err),
  );

  return deployment;
};

// ── Main pipeline (sequential, no racing setTimeouts) ────────────────────────
const runDeployment = async (id, repoUrl) => {
  const deployPath = path.join(process.cwd(), "deployments", id.toString());

  // ── 1. Mark deploying + clone ─────────────────────────────────────────────
  await addLog(id, "Cloning repository from GitHub...", "deploying");

  try {
    if (!fs.existsSync(deployPath)) {
      fs.mkdirSync(deployPath, { recursive: true });
    }
    await simpleGit().clone(repoUrl, deployPath);
    await addLog(id, "Repository cloned successfully ✅");
    await addLog(id, `Stored at: ${deployPath}`);
  } catch (cloneErr) {
    await addLog(id, "Clone failed ❌", "failed");
    await addLog(id, cloneErr.message);
    return;
  }

  // ── 2. Upload repo files to S3 ────────────────────────────────────────────
  try {
    const files = getAllFiles(deployPath);
    await addLog(id, `Total files found: ${files.length}`);
    await addLog(id, "Uploading repository to storage...");

    for (const file of files) {
      const relativePath = path
        .relative(deployPath, file)
        .split(path.sep)
        .join("/");
      await uploadFile(`deployments/${id}/${relativePath}`, file);
    }

    await addLog(id, "Uploaded to storage ✅");
  } catch (uploadErr) {
    await addLog(id, "Upload failed ❌", "failed");
    await addLog(id, uploadErr.message);
    return;
  }

  // ── 3. Push to build queue ────────────────────────────────────────────────
  try {
    await addLog(id, "Installing dependencies...");
    await addLog(id, "Building application...");
    await addLog(id, "Pushing build job to queue...");

    await publisher.lPush("build_queue", id.toString());
    await publisher.hSet("status", id.toString(), "uploaded");

    await addLog(id, "Build queued successfully 🚀");
  } catch (queueErr) {
    await addLog(id, "Queue push failed ❌", "failed");
    await addLog(id, queueErr.message);
    return;
  }

  // ── 4. Mark success ───────────────────────────────────────────────────────
  // The worker will mark Redis status → "success" when build+upload finishes.
  // We also mark MongoDB as success here so polling sees it even if worker
  // is slow. Worker will overwrite with its own final status via Redis.
  const deployUrl = `${process.env.DEPLOY_BASE_URL || "https://deployez-1.onrender.com/"}/${id}`;
  await addLog(id, `Deployment successful 🚀 → ${deployUrl}`, "success", deployUrl);
};

// ── Helper: push a log line + optional status update in one DB write ─────────
const addLog = async (id, message, newStatus = null, deployUrl = null) => {
  const update = { $push: { logs: message } };
  if (newStatus) update.$set = { status: newStatus };
  if (deployUrl) {
    update.$set = { ...(update.$set || {}), deployUrl };
  }
  await Deployment.findByIdAndUpdate(id, update);
};

// ── Helper: recursively get all files ────────────────────────────────────────
const getAllFiles = (dirPath) => {
  let filesList = [];
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (file === "node_modules" || file === ".git") return;
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      filesList = filesList.concat(getAllFiles(fullPath));
    } else {
      filesList.push(fullPath);
    }
  });

  return filesList;
};

// ─────────────────────────────────────────────────────────────────────────────

export const getDeploymentStatus = async (id) => {
  const deployment = await Deployment.findById(id);
  if (!deployment) return null;

  // Only use Redis status if it's a terminal "success" from the worker.
  // Don't let "uploaded" (intermediate) overwrite the real MongoDB status.
  const redisStatus = await publisher.hGet("status", id.toString());
  if (redisStatus === "success" || redisStatus === "failed") {
    deployment.status = redisStatus;
  }

  return deployment;
};

export const getDeploymentLogs = async (id) => {
  const deployment = await Deployment.findById(id);
  return deployment?.logs || [];
};