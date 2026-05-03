import "dotenv/config";
import { createClient } from "redis";
import { downloadS3Folder } from "./downloadS3Folder.js";
import { buildProject } from "./buildProject.js";
import { copyFinalDistToS3 } from "./copyFinalDistToS3.js";

const subscriber = createClient({
  url: process.env.REDIS_URL,
});

subscriber.on("error", (err) => {
  console.error("Redis error:", err);
});

await subscriber.connect();
console.log("🚀 Subscriber started...");

async function main() {
  while (true) {
    try {
      const result = await subscriber.brPop("build_queue", 0); // ⚠️ consistent name
      const id = result.element;

      console.log("Processing deployment:", id);

      await downloadS3Folder(`deployments/${id}`, id);
      await buildProject(id);
      await copyFinalDistToS3(id);
    } catch (error) {
      console.error("Worker error:", error); // ✅ fixed
    }
  }
}

main(); // ❗ don’t forget
