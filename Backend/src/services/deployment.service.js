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
publisher.on("connect", () => {
  console.log("Redis connected properly ✅");
});

await publisher.connect();

export const createDeployment = async (repoUrl) => {
  const deployment = await Deployment.create({
    repoUrl,
    status: "queued",
    logs: ["Deployment queued..."],
  });

  const id = deployment._id;

  simulateDeployment(id, repoUrl);

  return deployment;
};

const simulateDeployment = async (id, repoUrl) => {
  // console.log(process.cwd())
  const deployPath = path.join(process.cwd(), "deployments", id.toString());

  setTimeout(async () => {
    const deployment = await Deployment.findById(id);
    if (!deployment) return;

    deployment.status = "deploying";
    deployment.logs.push("Cloning repository from GitHub...");

    try {
      if (!fs.existsSync(deployPath)) {
        fs.mkdirSync(deployPath, { recursive: true });
      }

      // CLONE STEP
      await simpleGit().clone(repoUrl, deployPath);

      deployment.logs.push("Repository cloned successfully ✅");
      deployment.logs.push(`Stored at: ${deployPath}`);
    } catch (cloneErr) {
      deployment.status = "failed";
      deployment.logs.push("Clone failed ❌");
      deployment.logs.push(cloneErr.message);
      await deployment.save();
      return;
    }

    // FILE PROCESS + UPLOAD (separate try)
    try {
      const files = getAllFiles(deployPath);
      deployment.logs.push(`Total files: ${files.length}`);

      for (const file of files) {
        // Windows uses backslashes for file paths, but S3 requires forward slashes for keys
        const relativePath = path
          .relative(deployPath, file)
          .split(path.sep)
          .join("/");
        // console.log(relativePath);
        await uploadFile(`deployments/${id}/${relativePath}`, file);
      }

      deployment.logs.push("Uploaded to storage ✅");

      // 🔥 queue step
      deployment.logs.push("Pushing build job to queue...");

      try {
        await publisher.lPush("build_queue", id.toString());
        await publisher.hSet("status", id, "uploaded");
        deployment.logs.push("Build queued successfully 🚀");
      } catch (err) {
        deployment.logs.push("Queue push failed ❌");
        deployment.logs.push(err.message);
      }
    } catch (uploadErr) {
      deployment.status = "failed";
      deployment.logs.push("Upload failed ❌");
      deployment.logs.push(uploadErr.message);
      await deployment.save();
      return;
    }

    await deployment.save();
  }, 2000);

  setTimeout(async () => {
    const deployment = await Deployment.findById(id);
    if (!deployment || deployment.status === "failed") return;

    deployment.logs.push("Installing dependencies...");
    await deployment.save();
  }, 4000);

  setTimeout(async () => {
    const deployment = await Deployment.findById(id);
    if (!deployment || deployment.status === "failed") return;

    deployment.logs.push("Building application...");
    await deployment.save();
  }, 6000);

  setTimeout(async () => {
    const deployment = await Deployment.findById(id);
    if (!deployment || deployment.status === "failed") return;

    deployment.status = "success";
    deployment.deployUrl = `http://localhost:3000/${id}`;
    deployment.logs.push("Deployment successful 🚀");

    await deployment.save();
  }, 8000);
};

// 🔥 helper function
const getAllFiles = (dirPath) => {
  let filesList = [];

  const files = fs.readdirSync(dirPath);

  // console.log(files);

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

export const getDeploymentStatus = async (id) => {
  const deployment = await Deployment.findById(id);
  if (deployment) {
    const redisStatus = await publisher.hGet("status", id.toString());
    if (redisStatus) {
      deployment.status = redisStatus;
    }
  }
  return deployment;
};

export const getDeploymentLogs = async (id) => {
  const deployment = await Deployment.findById(id);
  return deployment?.logs || [];
};
