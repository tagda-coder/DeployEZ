import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    { 
      id: "deployez-frontend", 
      name: "deployez-frontend", 
      framework: "React", 
      time: "2h ago", 
      branch: "main", 
      url: "deployez-frontend.deployez.app",
      deployments: [
        { id: "dep_982bfe12", time: "2 mins ago", status: "Success", branch: "main", commit: "a1b2c3d", commitMsg: "Update UI for Deployments" },
        { id: "dep_102xyz88", time: "1 day ago", status: "Failed", branch: "main", commit: "8i9j0k1", commitMsg: "Fix styling issues" },
      ]
    },
    { 
      id: "api-gateway-service", 
      name: "api-gateway-service", 
      framework: "Node.js", 
      time: "5h ago", 
      branch: "production", 
      url: "api-gateway-service.deployez.app",
      deployments: [
        { id: "dep_447abc99", time: "5 hours ago", status: "Success", branch: "production", commit: "4f5g6h7", commitMsg: "Update gateway routing" },
      ]
    },
    { 
      id: "marketing-site", 
      name: "marketing-site", 
      framework: "Next.js", 
      time: "1d ago", 
      branch: "main", 
      url: "marketing-site.deployez.app",
      deployments: [
        { id: "dep_777abc99", time: "1 day ago", status: "Success", branch: "main", commit: "9g8f7e6", commitMsg: "Initial commit" },
      ]
    },
  ]);

  const addProject = (projectData) => {
    const newProject = {
      id: projectData.name.toLowerCase().replace(/\s+/g, '-'),
      name: projectData.name,
      framework: projectData.framework || "React",
      time: "Just now",
      branch: projectData.branch || "main",
      url: `${projectData.name.toLowerCase().replace(/\s+/g, '-')}.deployez.app`,
      deployments: [
        {
          id: `dep_${Math.random().toString(36).substring(2, 10)}`,
          time: "Just now",
          status: "Building",
          branch: projectData.branch || "main",
          commit: Math.random().toString(36).substring(2, 9),
          commitMsg: "Initial deployment",
        }
      ]
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const addDeployment = (projectId) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          deployments: [
            {
              id: `dep_${Math.random().toString(36).substring(2, 10)}`,
              time: "Just now",
              status: "Building",
              branch: p.branch,
              commit: Math.random().toString(36).substring(2, 9),
              commitMsg: "Manual trigger deployment",
            },
            ...p.deployments
          ]
        };
      }
      return p;
    }));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, addDeployment }}>
      {children}
    </ProjectContext.Provider>
  );
};
