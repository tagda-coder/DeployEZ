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

    // Validate if the ID is a valid MongoDB ObjectId (24 hex characters).
    // This prevents stray relative requests (like /style.css) from being treated as an id.
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(404).send("Not Found");
    }

    // Force trailing slash on root deployment URLs to ensure relative asset paths resolve correctly
    if (
      !req.params.filePath &&
      !req.params[0] &&
      !req.params.path &&
      !req.originalUrl.endsWith("/")
    ) {
      return res.redirect(301, req.originalUrl + "/");
    }

    let filePath = "index.html";

    // req.params.filePath captures the wildcard part after /:id/
    if (req.params.filePath) {
      // Remove trailing slashes from the requested file path (e.g. style.css/)
      let cleanedPath = Array.isArray(req.params.filePath)
        ? req.params.filePath.join("/")
        : req.params.filePath;

      filePath = cleanedPath.replace(/\/+$/, "");
    } else if (req.params[0]) {
      filePath = req.params[0].replace(/\/+$/, "");
    } else if (req.params.path) {
      let cleanedPath = Array.isArray(req.params.path)
        ? req.params.path.join("/")
        : req.params.path;
      filePath = cleanedPath.replace(/\/+$/, "");
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

    // Set CORS headers so external dependencies can be loaded properly
    res.setHeader("Access-Control-Allow-Origin", "*");
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
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".json")) return "application/json";
  if (file.endsWith(".mp4")) return "video/mp4";
  return "application/octet-stream";
};
