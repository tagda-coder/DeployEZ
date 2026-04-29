const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
// ======== MIDDLEWARES =========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======== CONNECT TO DATABASE ========
connectDB();

// ======= ROUTES =========
app.use("/api/auth", authRoutes);

module.exports = app;
