import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// ⚠️  Backend has NO GET /api/deployments endpoint.
// We store deployments in ProjectContext using localStorage as a local cache,
// and fire real deploys via POST /api/deploy.

/**
 * Trigger a new deployment by posting the repoUrl to the backend.
 * Backend: POST /api/deploy  → { message, deploymentId, status }
 */
export const deployProject = async ({ repoUrl }) => {
  const response = await api.post("/api/deploy", { repoUrl });
  return response.data; // { message, deploymentId, status }
};

/**
 * Poll deployment status (logs + status string).
 * Backend: GET /api/status/:id → { status, logs }
 */
export const getDeploymentStatus = async (id) => {
  const response = await api.get(`/api/status/${id}`);
  return response.data; // { status, logs }
};

/**
 * Fetch only the log lines for a deployment.
 * Backend: GET /api/logs/:id → { logs }
 */
export const getDeploymentLogs = async (id) => {
  const response = await api.get(`/api/logs/${id}`);
  return response.data; // { logs }
};