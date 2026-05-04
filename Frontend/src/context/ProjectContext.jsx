/**
 * ProjectContext.jsx
 *
 * Key design decisions based on backend analysis:
 *
 * 1. Backend has NO GET /api/deployments endpoint.
 *    → Projects & deployments are stored in localStorage for persistence.
 *
 * 2. Backend POST /api/deploy only accepts { repoUrl } (projectName is ignored).
 *    → We track projectName purely on the frontend.
 *
 * 3. Backend returns { message, deploymentId, status } from POST /api/deploy.
 *    → We store the real deploymentId so DeployLogs can poll GET /api/status/:id.
 *
 * 4. Deployment status is polled by DeployLogs, not here.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { deployProject } from "../features/dashboard/service/deploy.api";
import { toast } from "react-toastify";

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

// ── localStorage helpers ──────────────────────────────────────────────────────
const STORAGE_KEY = "deployez_projects";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    /* quota exceeded — silent fail */
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(loadFromStorage);
  const [loading, setLoading] = useState(false);

  // Persist to localStorage whenever projects change
  useEffect(() => {
    saveToStorage(projects);
  }, [projects]);

  // ── addProject ─────────────────────────────────────────────────────────────
  // Creates a project record locally AND fires a real deployment to the backend.
  // Returns the new project object (with real deploymentId from backend).
  const addProject = useCallback(async ({ name, repoUrl, framework = "React", branch = "main" }) => {
    if (!repoUrl) {
      toast.error("A repository URL is required.");
      return;
    }

    setLoading(true);
    try {
      // Fire deployment → backend: POST /api/deploy { repoUrl }
      const res = await deployProject({ repoUrl });
      // res = { message, deploymentId, status }

      const deploymentId = res.deploymentId;
      const now = new Date();

      const newDeployment = {
        id: deploymentId,           // real MongoDB _id — used for polling
        dbId: deploymentId,
        time: now.toLocaleString(),
        status: "Building",          // will be updated via polling in DeployLogs
        branch,
        commit: "manual",
        commitMsg: "Manual deploy",
        repoUrl,
      };

      const projectId = name.toLowerCase().replace(/\s+/g, "-");

      setProjects((prev) => {
        const exists = prev.find((p) => p.id === projectId);
        if (exists) {
          // Add new deployment to existing project
          return prev.map((p) =>
            p.id === projectId
              ? { ...p, deployments: [newDeployment, ...p.deployments] }
              : p,
          );
        }
        // Create brand-new project entry
        const newProject = {
          id: projectId,
          name,
          framework,
          branch,
          time: now.toLocaleDateString(),
          url: null,
          deployments: [newDeployment],
        };
        return [newProject, ...prev];
      });

      toast.success(res.message || "Deployment started!");
      return { projectId, deploymentId };
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Deployment failed. Please try again.";
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── addDeployment ──────────────────────────────────────────────────────────
  // Re-deploys an existing project using the same repoUrl as its first deployment.
  const addDeployment = useCallback(async (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project || !project.deployments.length) {
      toast.error("Could not find project to re-deploy.");
      return;
    }

    const repoUrl = project.deployments[0].repoUrl;
    if (!repoUrl) {
      toast.error("No repository URL found for this project.");
      return;
    }

    return addProject({
      name: project.name,
      repoUrl,
      framework: project.framework,
      branch: project.branch,
    });
  }, [projects, addProject]);

  // ── updateDeploymentStatus ─────────────────────────────────────────────────
  // Called by DeployLogs when it finishes polling — syncs final status locally.
  const updateDeploymentStatus = useCallback((projectId, deploymentId, status) => {
    const statusMap = {
      success: "Success",
      failed: "Failed",
      deploying: "Building",
      queued: "Building",
    };
    const uiStatus = statusMap[status] || "Building";

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              deployments: p.deployments.map((d) =>
                d.id === deploymentId ? { ...d, status: uiStatus } : d,
              ),
            }
          : p,
      ),
    );
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        addProject,
        addDeployment,
        updateDeploymentStatus,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};