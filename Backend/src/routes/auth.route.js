import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// @route    POST /api/auth/signup
// @desc     Register new user
// @access   Public
router.post("/signup", signup);

// @route    POST /api/auth/login
// @desc     Login User
// @access   Public
router.post("/login", login);

// @route    POST /api/auth/logout
// @desc     Logout User
// @access   Private
router.post("/logout", authMiddleware, logout);

// Export the router to be used in app.js
export default router;