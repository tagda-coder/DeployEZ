import express from "express";
import {
  deployController,
  getLogsController,
  getStatusController,
  getDeploymentController,
} from "../controllers/deploy.controller.js";

const router = express.Router();

router.post("/deploy", deployController);

router.get("/status/:id", getStatusController);

router.get("/logs/:id", getLogsController);

router.get("/:id", getDeploymentController); 

export default router;
