import path from "path";
import fs from "fs";
import { exec } from "child_process";

const runCommand = (command, cwd) => {
  return new Promise((resolve, reject) => {
    const process = exec(command, { cwd });

    process.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    process.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Failed: ${command}`));
    });
  });
};

export const buildProject = async (id) => {
  const projectPath = path.join(process.cwd(), "builds", id);
  const frontendPath = path.join(projectPath, "Frontend");

  let targetPath;

  if (fs.existsSync(path.join(frontendPath, "package.json"))) {
    targetPath = frontendPath;
  } else if (fs.existsSync(path.join(projectPath, "package.json"))) {
    targetPath = projectPath;
  } else {
    console.log(
      "⏭️ No package.json found. Skipping build step (assuming static HTML/CSS/JS site).",
    );
    return;
  }

  console.log(`📦 Installing dependencies in ${targetPath}...`);
  await runCommand("npm install", targetPath);

  console.log(`🏗 Running build in ${targetPath}...`);
  await runCommand("npm run build", targetPath);

  console.log("✅ Build completed");
};
