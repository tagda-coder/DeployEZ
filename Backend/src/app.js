const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// ======== MIDDLEWARES =========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======== CONNECT TO DATABASE ========
connectDB();


// ======= ROUTES ========
app.get("/", (req, res) => {
  res.send("Welcome to DeployEZ Backend API!");
});


module.exports = app;