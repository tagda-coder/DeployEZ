import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, RefreshCw, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { getDeploymentStatus } from "../service/deploy.api";
import { useProjects } from "../../../context/ProjectContext";

const DeployLogs = () => {
  const { projectId, deployId } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("queued");
  const { addDeployment } = useProjects();

  useEffect(() => {
    let interval;

    const fetchLogs = async () => {
      try {
        const data = await getDeploymentStatus(deployId);
        if (data) {
          setStatus(data.status);
          setLogs(data.logs || []);
          if (data.status === "success" || data.status === "failed") {
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLogs();
    interval = setInterval(fetchLogs, 2000);

    return () => clearInterval(interval);
  }, [deployId]);

  const isBuilding = status === "queued" || status === "deploying";

  const handleRedeploy = async () => {
    if (!isBuilding) {
      await addDeployment(projectId);
      navigate(`/project/${projectId}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-right-4 duration-500 pb-10 h-full max-h-[calc(100vh-6rem)]">
      <div className="flex items-center gap-4 mt-4 relative z-10 w-full shrink-0">
        <Link
          to={`/project/${projectId}`}
          className="p-2 bg-(--card-bg) border border-(--card-border) rounded-lg hover:border-(--color-accent) transition-all duration-300 text-(--text-muted) hover:text-(--text-primary)"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-(--text-primary)">
              {projectId}
            </h1>
            <span
              className={`capitalize px-2.5 py-1 text-xs font-semibold rounded-full ${isBuilding ? "bg-(--status-warning-bg) text-(--status-warning) animate-pulse" : status === "success" ? "bg-(--status-success-bg) text-(--status-success)" : status === "failed" ? "bg-(--status-error-bg) text-(--status-error)" : "bg-(--card-bg) text-(--text-muted)"}`}
            >
              {status}
            </span>
          </div>
          <p className="text-sm text-(--text-muted) mt-1 font-mono">
            Deploy ID: {deployId} • branch: main
          </p>
        </div>
        <div className="ml-auto">
          <button
            onClick={handleRedeploy}
            disabled={isBuilding}
            className="flex items-center gap-2 px-4 py-2 bg-(--card-bg) border border-(--card-border) text-(--text-primary) hover:border-(--color-accent) disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-300 text-sm"
          >
            <RefreshCw
              className={`w-4 h-4 ${isBuilding ? "animate-spin text-(--color-accent)" : ""}`}
            />
            <span>{isBuilding ? "Building..." : "Re-deploy"}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 relative z-10 w-full flex flex-col min-h-0 mt-2">
        <div className="flex-1 flex flex-col bg-(--terminal-bg) rounded-2xl overflow-hidden shadow-lg border border-(--card-border) min-h-[500px]">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800 bg-[#1a1a1a]">
            <Terminal className="w-4 h-4 text-neutral-400" />
            <span className="text-sm font-medium text-neutral-400">
              Build Terminal
            </span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-(--terminal-text) flex flex-col gap-1.5 custom-scrollbar">
            {logs.map((log, i) => (
              <div
                key={i}
                className={`flex gap-3 ${log.includes("❌") ? "text-red-400" : log.includes("✅") || log.includes("🚀") ? "text-green-400" : ""}`}
              >
                <span className="opacity-50 select-none text-xs mt-0.5">
                  {new Date().toISOString().split("T")[1].slice(0, -1)}
                </span>
                <span className="whitespace-pre-wrap">{log}</span>
              </div>
            ))}
            {isBuilding && (
              <div className="flex gap-3 mt-2 animate-pulse text-(--terminal-prompt)">
                <span className="opacity-50 select-none text-xs mt-0.5">
                  {new Date().toISOString().split("T")[1].slice(0, -1)}
                </span>
                <span>_</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployLogs;
