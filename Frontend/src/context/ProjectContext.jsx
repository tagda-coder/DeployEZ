import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getDeployments,
  deployProject,
} from "../features/dashboard/service/deploy.api";

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getDeployments();

      // Transform backend map to grouped project array format
      const grouped = {};
      data.deployments.forEach((dep) => {
        const pName = dep.projectName || "Unknown Project";
        if (!grouped[pName]) {
          grouped[pName] = {
            id: pName,
            name: pName,
            framework: "React", // Hardcoded for now
            time: new Date(dep.createdAt).toLocaleDateString(),
            branch: "main",
            url: `${pName.toLowerCase().replace(/\s+/g, "-")}.deployez.app`,
            deployments: [],
          };
        }

        let statusString = "Building";
        if (dep.status === "success") statusString = "Success";
        if (dep.status === "failed") statusString = "Failed";

        grouped[pName].deployments.push({
          id: dep._id,
          dbId: dep._id,
          time: new Date(dep.createdAt).toLocaleString(),
          status: statusString,
          branch: "main",
          commit: "manual",
          commitMsg: "Deployment",
          repoUrl: dep.repoUrl,
        });
      });

      setProjects(Object.values(grouped));
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (projectData) => {
    try {
      const res = await deployProject({
        projectName: projectData.name,
        repoUrl: projectData.repoUrl,
      });
      // Re-fetch everything after a successful trigger
      await fetchProjects();
      return { id: projectData.name, ...res };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const addDeployment = async (projectId) => {
    // Project ID here is the project name
    const project = projects.find((p) => p.id === projectId);
    if (!project || !project.deployments.length) return;

    const repoUrl =
      project.deployments[0].repoUrl ||
      "https://github.com/mayank-user/deployez-frontend";

    try {
      await deployProject({
        projectName: project.name,
        repoUrl: repoUrl,
      });
      await fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, loading, addProject, addDeployment, fetchProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
