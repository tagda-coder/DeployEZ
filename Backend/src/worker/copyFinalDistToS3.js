import path from "path";
import fs from "fs";
import { uploadFile } from "../services/storage.service.js";

// helper
const getAllFiles = (dirPath) => {
  let filesList = [];

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      filesList = filesList.concat(getAllFiles(fullPath));
    } else {
      filesList.push(fullPath);
    }
  });

  return filesList;
};

export const copyFinalDistToS3 = async (id) => {
  const distPath = path.join(process.cwd(), "builds", id, "Frontend", "dist");

  if (!fs.existsSync(distPath)) {
    console.log("❌ dist folder not found");
    return;
  }

  console.log("🚀 Uploading final dist...");

  const files = getAllFiles(distPath);

  for (const file of files) {
    const relativePath = path
      .relative(distPath, file)
      .split(path.sep)
      .join("/");

    console.log("Uploading:", relativePath);

    await uploadFile(`dist/${id}/${relativePath}`, file);
  }

  console.log("✅ Deployment uploaded successfully");
};
