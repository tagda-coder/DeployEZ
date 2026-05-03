import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export const requestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    let filePath = "index.html";

    if (req.params.path) {
      filePath = Array.isArray(req.params.path)
        ? req.params.path.join("/")
        : req.params.path;
    }

    if (!filePath || filePath === "") {
      filePath = "index.html";
    }

    const key = `dist/${id}/${filePath}`;
    console.log(`Trying S3 key: "${key}"`);

    const response = await s3.send(
      new GetObjectCommand({
        Bucket: "deployez",
        Key: key,
      }),
    );

    res.setHeader("Content-Type", getContentType(filePath));

    response.Body.pipe(res);
  } catch (err) {
    if (err.name === "NoSuchKey" || err.Code === "NoSuchKey") {
      // Normal 404 from S3
      res.status(404).send("File not found");
    } else {
      console.error("S3 Request Error:", err);
      res.status(500).send("Internal Server Error");
    }
  }
};

const getContentType = (file) => {
  if (file.endsWith(".html")) return "text/html";
  if (file.endsWith(".js")) return "application/javascript";
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".jpg")) return "image/jpeg";
  if (file.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
};
