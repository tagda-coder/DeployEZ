import { X, GitCommit, GitBranch, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { useProjects } from "../../../context/ProjectContext";

const NewDeployModal = ({ onClose, projectId }) => {
  const [branch, setBranch] = useState("main");
  const [isDeploying, setIsDeploying] = useState(false);
  const { addDeployment } = useProjects();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      // addDeployment fires a real POST /api/deploy and returns { projectId, deploymentId }
      const result = await addDeployment(projectId);
      onClose();
      if (result?.deploymentId) {
        navigate(`/project/${projectId}/deploy/${result.deploymentId}`);
      }
    } catch {
      // error toast handled inside addDeployment
    } finally {
      setIsDeploying(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-(--bg-base) border border-(--card-border) rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-(--card-border)">
          <div>
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Trigger New Deploy
            </h2>
            <p className="text-sm text-(--text-muted) mt-1">
              Re-deploy using the same repository.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg) rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--text-label)">Branch</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GitBranch className="h-4 w-4 text-(--text-muted)" />
              </div>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="pl-10 px-4 py-2 w-full bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--input-border-focus) text-(--text-primary) transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--text-label)">
              Commit SHA <span className="text-(--text-muted) font-normal">(optional — not sent to backend yet)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GitCommit className="h-4 w-4 text-(--text-muted)" />
              </div>
              <input
                type="text"
                placeholder="e.g. 7a8b9c0"
                disabled
                className="pl-10 px-4 py-2 w-full bg-(--input-bg) border border-(--input-border) rounded-lg text-(--text-primary) transition-all duration-300 opacity-50 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-(--text-muted)">
              Latest commit from the branch will be deployed.
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-(--status-warning-bg) border border-(--status-warning) rounded-lg text-(--status-warning) text-sm font-medium">
            This will create a new deployment on top of the current production build.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-(--card-bg) border-t border-(--card-border) flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-transparent text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-base) rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="flex items-center gap-2 px-5 py-2 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-lg font-medium transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlayCircle className="w-4 h-4" />
            {isDeploying ? "Starting..." : "Deploy Now"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default NewDeployModal;