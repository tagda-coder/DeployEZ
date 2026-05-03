import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import deploymentRoutes from "./routes/deployment.route.js";
import requestRoutes from "./routes/request.route.js";

const app = express();
// ======== MIDDLEWARES =========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======== CONNECT TO DATABASE ========
connectDB();

// ======= ROUTES =========
app.use("/api/auth", authRoutes);
app.use("/api", deploymentRoutes);
app.use("/", requestRoutes);

export default app;
