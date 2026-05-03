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

  if (!fs.existsSync(frontendPath)) {
    console.log("❌ No frontend found");
    return;
  }

  console.log("📦 Installing dependencies...");
  await runCommand("npm install", frontendPath);

  console.log("🏗 Running build...");
  await runCommand("npm run build", frontendPath);

  console.log("✅ Build completed");
};