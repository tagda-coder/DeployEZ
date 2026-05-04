import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import deploymentRoutes from "./routes/deployment.route.js";
import requestRoutes from "./routes/request.route.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
// ======== MIDDLEWARES =========
// Enable CORS for all routes (MUST be defined before routes)
app.use(cors({
  origin:["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ======== CONNECT TO DATABASE ========
connectDB();

// ======= ROUTES =========
app.use("/api/auth", authRoutes);
app.use("/api", deploymentRoutes);
app.use("/", requestRoutes);

export default app;
