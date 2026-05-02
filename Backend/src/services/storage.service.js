import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // 🔥 important
});

const getContentType = (filePath) => {
  const ext = path.extname(filePath);

  const map = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".gif": "image/gif",
  };

  return map[ext] || "application/octet-stream";
};

export const uploadFile = async (fileName, filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath);

    console.log("Uploading:", fileName);

    const command = new PutObjectCommand({
      Bucket: "deployez",
      Key: fileName,
      Body: fileContent,
      ContentType: getContentType(filePath),
    });

    const response = await s3.send(command);

    console.log("Uploaded:", fileName);

    return response;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};