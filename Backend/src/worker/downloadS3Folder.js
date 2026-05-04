import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export const downloadS3Folder = async (prefix, id) => {
  const buildPath = path.join(process.cwd(), "builds", id);

  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath, { recursive: true });
  }

  // 🔥 1. list files
  const data = await s3.send(
    new ListObjectsV2Command({
      Bucket: "deployez",
      Prefix: prefix,
    }),
  );

  const files = data.Contents || [];
  console.log("Files found:", files.length);

  // 🔥 2. download each file
  for (const file of files) {
    if (!file.Key) continue;

    const relativePath = file.Key.replace(prefix + "/", "");
    const localPath = path.join(buildPath, relativePath);

    fs.mkdirSync(path.dirname(localPath), { recursive: true });

    const response = await s3.send(
      new GetObjectCommand({
        Bucket: "deployez",
        Key: file.Key,
      }),
    );

    const stream = response.Body;

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(localPath);
      stream.pipe(writeStream);
      stream.on("error", reject);
      writeStream.on("finish", resolve);
    });

    console.log("Downloaded:", relativePath);
  }

  console.log("✅ Download complete");
};
