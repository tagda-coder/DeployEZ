import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const deployProject = async ({ repoUrl }) => {
  const response = await api.post("/api/deploy", { repoUrl });
  return response.data; // { message, deploymentId, status }
};

export const getDeploymentStatus = async (id) => {
  const response = await api.get(`/api/status/${id}`);
  const data = response.data;
  // Safety net — ensure logs is always an array
  return {
    status: data.status ?? "queued",
    logs: Array.isArray(data.logs) ? data.logs : [],
    deployUrl: data.deployUrl ?? null,
  };
};

export const getDeploymentLogs = async (id) => {
  const response = await api.get(`/api/logs/${id}`);
  return response.data;
};