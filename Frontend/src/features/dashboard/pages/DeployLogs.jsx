import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, RefreshCw, Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getDeploymentStatus } from "../service/deploy.api";
import { useProjects } from "../../../context/ProjectContext";

const TERMINAL_COLORS = {
  "❌": "text-red-400",
  "✅": "text-green-400",
  "🚀": "text-green-400",
};

const getLogColor = (log) => {
  for (const [emoji, cls] of Object.entries(TERMINAL_COLORS)) {
    if (log.includes(emoji)) return cls;
  }
  return "";
};

const DeployLogs = () => {
  const { projectId, deployId } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("queued");
  const { addDeployment, updateDeploymentStatus } = useProjects();
  const logsEndRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-scroll to the bottom whenever new logs arrive
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    if (!deployId) return;

    const fetchStatus = async () => {
      try {
        // GET /api/status/:id → { status, logs }
        const data = await getDeploymentStatus(deployId);
        if (!data) return;

        setStatus(data.status);
        setLogs(data.logs || []);

        const finished = data.status === "success" || data.status === "failed";
        if (finished) {
          clearInterval(intervalRef.current);
          // Sync final status back into ProjectContext / localStorage
          if (updateDeploymentStatus) {
            updateDeploymentStatus(projectId, deployId, data.status);
          }
        }
      } catch (err) {
        console.error("Failed to fetch deployment status:", err);
      }
    };

    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, 2000);

    return () => clearInterval(intervalRef.current);
  }, [deployId, projectId, updateDeploymentStatus]);

  const isBuilding = status === "queued" || status === "deploying";

  const handleRedeploy = async () => {
    if (isBuilding) return;
    try {
      const result = await addDeployment(projectId);
      if (result?.deploymentId) {
        navigate(`/project/${projectId}/deploy/${result.deploymentId}`);
      } else {
        navigate(`/project/${projectId}`);
      }
    } catch {
      /* toast shown inside addDeployment */
    }
  };

  const statusBadgeClass = isBuilding
    ? "bg-(--status-warning-bg) text-(--status-warning) animate-pulse"
    : status === "success"
      ? "bg-(--status-success-bg) text-(--status-success)"
      : status === "failed"
        ? "bg-(--status-error-bg) text-(--status-error)"
        : "bg-(--card-bg) text-(--text-muted)";

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-right-4 duration-500 pb-10 h-full max-h-[calc(100vh-6rem)]">
      {/* Header */}
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
            <span className={`capitalize px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadgeClass}`}>
              {status}
            </span>
          </div>
          <p className="text-sm text-(--text-muted) mt-1 font-mono">
            Deploy ID: {deployId} · branch: main
          </p>
        </div>

        <div className="ml-auto">
          <button
            onClick={handleRedeploy}
            disabled={isBuilding}
            className="flex items-center gap-2 px-4 py-2 bg-(--card-bg) border border-(--card-border) text-(--text-primary) hover:border-(--color-accent) disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-300 text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isBuilding ? "animate-spin text-(--color-accent)" : ""}`} />
            <span>{isBuilding ? "Building..." : "Re-deploy"}</span>
          </button>
        </div>
      </div>

      {/* Terminal */}
      <div className="flex-1 relative z-10 w-full flex flex-col min-h-0 mt-2">
        <div className="flex-1 flex flex-col bg-(--terminal-bg) rounded-2xl overflow-hidden shadow-lg border border-(--card-border) min-h-125">
          {/* Terminal bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800 bg-[#1a1a1a]">
            <Terminal className="w-4 h-4 text-neutral-400" />
            <span className="text-sm font-medium text-neutral-400">Build Terminal</span>
          </div>

          {/* Log lines */}
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-(--terminal-text) flex flex-col gap-1.5 custom-scrollbar">
            {logs.length === 0 && !isBuilding && (
              <span className="text-neutral-500 italic">No logs yet.</span>
            )}
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-3 ${getLogColor(log)}`}>
                <span className="opacity-40 select-none text-xs mt-0.5 shrink-0 tabular-nums">
                  {new Date().toISOString().split("T")[1].slice(0, 8)}
                </span>
                <span className="whitespace-pre-wrap break-all">{log}</span>
              </div>
            ))}

            {/* Blinking cursor while building */}
            {isBuilding && (
              <div className="flex gap-3 mt-2 animate-pulse text-(--terminal-prompt)">
                <span className="opacity-40 select-none text-xs mt-0.5">
                  {new Date().toISOString().split("T")[1].slice(0, 8)}
                </span>
                <span>_</span>
              </div>
            )}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployLogs;