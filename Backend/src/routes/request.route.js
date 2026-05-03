import express from "express";
import { requestHandler } from "../controllers/request.controller.js";

const router = express.Router();

router.get(["/:id", "/:id/*path"], requestHandler);

export default router;
