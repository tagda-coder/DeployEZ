import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const getDeployments = async () => {
  const response = await api.get("/api/deployments");
  return response.data;
};

export const deployProject = async ({ repoUrl, projectName }) => {
  const response = await api.post("/api/deploy", { repoUrl, projectName });
  return response.data;
};

export const getDeploymentStatus = async (id) => {
  const response = await api.get(`/api/status/${id}`);
  return response.data;
};

export const getDeploymentLogs = async (id) => {
  const response = await api.get(`/api/logs/${id}`);
  return response.data;
};
