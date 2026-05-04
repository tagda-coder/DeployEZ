import "dotenv/config";
import { createClient } from "redis";
import { downloadS3Folder } from "./downloadS3Folder.js";
import { buildProject } from "./buildProject.js";
import { copyFinalDistToS3 } from "./copyFinalDistToS3.js";

const subscriber = createClient({
  url: process.env.REDIS_URL,
});

const publisher = createClient({
  url: process.env.REDIS_URL,
});

subscriber.on("error", (err) => {
  console.error("Redis error:", err);
});

publisher.on("error", (err) => {
  console.error("Redis publisher error:", err);
});

await subscriber.connect();
await publisher.connect();
console.log("🚀 Subscriber and Publisher started...");

async function main() {
  while (true) {
    try {
      const result = await subscriber.brPop("build_queue", 0); // ⚠️ consistent name
      const id = result.element;

      console.log("Processing deployment:", id);

      await downloadS3Folder(`deployments/${id}`, id);
      await buildProject(id);
      await copyFinalDistToS3(id);
      publisher.hSet("status", id, "success"); // ✅ update status to completed
    } catch (error) {
      console.error("Worker error:", error); // ✅ fixed
    }
  }
}

main(); // ❗ don’t forget
