import {
  createDeployment,
  getDeploymentLogs,
  getDeploymentStatus,
} from "../services/deployment.service.js";

/**
 * @route POST /deploy
 * @desc Create a new deployment
 * @access Public
 */
export const deployController = async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) {
      return res.status(400).json({ error: "Repository URL is required" });
    }
    const deployment = await createDeployment(repoUrl);
    res.status(201).json({
      message: "Deployment started",
      deploymentId: deployment._id,
      status: deployment.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @route GET /status/:id
 * @desc Get deployment status by ID
 * @access Public
 */
export const getStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const deployment = await getDeploymentStatus(id);
    if (!deployment) {
      return res.status(404).json({ error: "Deployment not found" });
    }
    res.json({
      status: deployment.status,
      logs: deployment.logs,
      deployUrl: deployment.deployUrl ?? null, // ← added
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @route GET /logs/:id
 * @desc Get deployment logs by ID
 * @access Public
 */
export const getLogsController = async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await getDeploymentLogs(id);
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route GET /:id
 * @desc Redirect to deployed URL
 * @access Public
 */
export const getDeploymentController = async (req, res) => {
  try {
    const { id } = req.params;
    const deployment = await getDeploymentStatus(id); // reuse existing service
    if (!deployment) {
      return res.status(404).json({ error: "Deployment not found" });
    }
    if (!deployment.deployUrl) {
      return res.status(400).json({ error: "Deployment not ready yet", status: deployment.status });
    }
    res.redirect(deployment.deployUrl); // ✅ correct field name
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};