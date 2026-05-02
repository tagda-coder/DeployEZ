import { Deployment } from "../models/deployment.model.js";
import simpleGit from "simple-git";
import path from "path";
import fs from "fs";

const git = simpleGit();

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
  const deployPath = path.join(process.cwd(), "deployments", id.toString());

  setTimeout(async () => {
    const deployment = await Deployment.findById(id);
    if (!deployment) return;

    deployment.status = "deploying";
    deployment.logs.push("Cloning repository from GitHub...");

    try {
      await git.clone(repoUrl, deployPath);

      deployment.logs.push("Repository cloned successfully ✅");
      deployment.logs.push(`Stored at: ${deployPath}`);

      // 🔥 read files AFTER clone
      const files = getAllFiles(deployPath);
      deployment.logs.push(`Total files: ${files.length}`);
    } catch (err) {
      deployment.status = "failed";
      deployment.logs.push("Clone failed ❌");
      deployment.logs.push(err.message);
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
    deployment.deployUrl = `https://${id}.deployez.app`;
    deployment.logs.push("Deployment successful 🚀");

    await deployment.save();
  }, 8000);
};

// 🔥 helper function
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

export const getDeploymentStatus = async (id) => {
  return await Deployment.findById(id);
};

export const getDeploymentLogs = async (id) => {
  const deployment = await Deployment.findById(id);
  return deployment?.logs || [];
};
