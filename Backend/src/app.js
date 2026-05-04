import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import deploymentRoutes from "./routes/deployment.route.js";
import requestRoutes from "./routes/request.route.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { getDeploymentController } from "./controllers/deploy.controller.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "https://deployez-1.onrender.com", 
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ======== CONNECT TO DATABASE ========
connectDB();

// ======= STATIC FILES (before routes) =========
app.use(express.static("./public"));

// ======= API ROUTES =========
app.use("/api/auth", authRoutes);
app.use("/api", deploymentRoutes);
app.use("/api", requestRoutes);

// ======= DEPLOYMENT REDIRECT =========
app.get("/:id", getDeploymentController);

app.get(/(.*)/, (req, res) => {                         
  res.sendFile(path.resolve("public/index.html"));
});

export default app;