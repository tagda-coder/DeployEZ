import path from "path";
import fs from "fs";
import { uploadFile } from "../services/storage.service.js";

// helper
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

export const copyFinalDistToS3 = async (id) => {
  const projectPath = path.join(process.cwd(), "builds", id);
  let distPath = path.join(projectPath, "Frontend", "dist");

  if (!fs.existsSync(distPath)) {
    distPath = path.join(projectPath, "dist");
  }

  // If there's no dist folder at all, upload the root folder
  if (!fs.existsSync(distPath)) {
    console.log(
      "⚠️ No dist folder found, treating as a static HTML/JS/CSS site. Uploading root...",
    );
    distPath = projectPath;
  }

  console.log("🚀 Uploading final dist...");

  const files = getAllFiles(distPath);

  for (const file of files) {
    const relativePath = path
      .relative(distPath, file)
      .split(path.sep)
      .join("/");

    console.log("Uploading:", relativePath);

    if (file.endsWith(".html")) {
      const content = fs.readFileSync(file, "utf8");
      const replacePaths = content
        .replace(/href="\//g, `href="/${id}/`)
        .replace(/src="\//g, `src="/${id}/`);
      fs.writeFileSync(file, replacePaths);
    }

    await uploadFile(`dist/${id}/${relativePath}`, file);
  }

  console.log("✅ Deployment uploaded successfully");
};
