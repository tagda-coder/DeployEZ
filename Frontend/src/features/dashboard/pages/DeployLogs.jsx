import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, RefreshCw, Terminal, AlertCircle, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { getDeploymentStatus } from "../service/deploy.api";
import { useProjects } from "../../../context/ProjectContext";

const getLogColor = (log) => {
  if (log.includes("❌") || log.toLowerCase().includes("failed") || log.toLowerCase().includes("error"))
    return "text-red-400";
  if (log.includes("✅") || log.includes("🚀") || log.toLowerCase().includes("success"))
    return "text-green-400";
  if (
    log.toLowerCase().includes("cloning") ||
    log.toLowerCase().includes("installing") ||
    log.toLowerCase().includes("building") ||
    log.toLowerCase().includes("uploading")
  )
    return "text-yellow-300";
  return "text-neutral-300";
};

const fmtTime = (ts) => new Date(ts).toISOString().split("T")[1].slice(0, 8);

const DeployLogs = () => {
  const { projectId, deployId } = useParams();
  const navigate = useNavigate();

  const [logEntries, setLogEntries] = useState([]);
  const [status, setStatus] = useState("queued");
  const [deployUrl, setDeployUrl] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const { addDeployment, updateDeploymentStatus } = useProjects();
  const logsEndRef = useRef(null);
  const intervalRef = useRef(null);
  const seenCountRef = useRef(0);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logEntries]);

  const fetchStatus = useCallback(async () => {
    if (!deployId) return;
    try {
      const data = await getDeploymentStatus(deployId);
      if (!data) return;

      setFetchError(null);
      setStatus(data.status);

      // Store deployUrl when it arrives
      if (data.deployUrl) setDeployUrl(data.deployUrl);

      const incoming = data.logs || [];
      if (incoming.length > seenCountRef.current) {
        const now = Date.now();
        const newEntries = incoming
          .slice(seenCountRef.current)
          .map((text) => ({ text, ts: now }));
        setLogEntries((prev) => [...prev, ...newEntries]);
        seenCountRef.current = incoming.length;
      }

      const finished = data.status === "success" || data.status === "failed";
      if (finished) {
        clearInterval(intervalRef.current);
        updateDeploymentStatus?.(projectId, deployId, data.status);
      }
    } catch (err) {
      console.error("Polling error:", err);
      setFetchError("Could not reach the server. Retrying...");
    }
  }, [deployId, projectId, updateDeploymentStatus]);

  useEffect(() => {
    if (!deployId) return;
    setLogEntries([]);
    setStatus("queued");
    setDeployUrl(null);
    setFetchError(null);
    seenCountRef.current = 0;

    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, 2000);
    return () => clearInterval(intervalRef.current);
  }, [deployId, fetchStatus]);

  const isBuilding = status === "queued" || status === "deploying";

  const statusBadgeClass = isBuilding
    ? "bg-(--status-warning-bg) text-(--status-warning) animate-pulse"
    : status === "success"
      ? "bg-(--status-success-bg) text-(--status-success)"
      : status === "failed"
        ? "bg-(--status-error-bg) text-(--status-error)"
        : "bg-(--card-bg) text-(--text-muted)";

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
            <h1 className="text-2xl font-bold tracking-tight text-(--text-primary)">{projectId}</h1>
            <span className={`capitalize px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadgeClass}`}>
              {status}
            </span>
          </div>
          <p className="text-sm text-(--text-muted) mt-1 font-mono">
            Deploy ID: <span className="text-neutral-400">{deployId}</span> · branch: main
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Live URL button — shows once deployment succeeds */}
          {status === "success" && deployUrl && (
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-(--status-success-bg) border border-(--status-success) text-(--status-success) rounded-lg font-medium text-sm transition-all duration-300 hover:opacity-80"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Site</span>
            </a>
          )}

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

          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-[#1a1a1a] shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <Terminal className="w-4 h-4 text-neutral-500 ml-2" />
              <span className="text-sm font-medium text-neutral-400">Build Terminal</span>
            </div>
            {fetchError && (
              <div className="flex items-center gap-1.5 text-xs text-yellow-400">
                <AlertCircle className="w-3.5 h-3.5" />
                {fetchError}
              </div>
            )}
          </div>

          {/* Log output */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-sm leading-6 flex flex-col gap-0.5 custom-scrollbar">
            {logEntries.length === 0 && isBuilding && (
              <div className="flex gap-3 text-neutral-500 animate-pulse">
                <span className="text-xs mt-0.5 tabular-nums opacity-50 shrink-0">{fmtTime(Date.now())}</span>
                <span>Waiting for logs from server...</span>
              </div>
            )}

            {logEntries.length === 0 && !isBuilding && (
              <span className="text-neutral-600 italic">No logs available for this deployment.</span>
            )}

            {logEntries.map((entry, i) => (
              <div
                key={i}
                className={`flex gap-3 transition-opacity duration-300 ${getLogColor(entry.text)}`}
              >
                <span className="opacity-30 select-none text-xs mt-0.5 shrink-0 tabular-nums w-16">
                  {fmtTime(entry.ts)}
                </span>
                <span className="whitespace-pre-wrap break-all">{entry.text}</span>
              </div>
            ))}

            {isBuilding && logEntries.length > 0 && (
              <div className="flex gap-3 mt-1 text-cyan-400">
                <span className="opacity-30 select-none text-xs mt-0.5 tabular-nums w-16">{fmtTime(Date.now())}</span>
                <span className="animate-pulse">▋</span>
              </div>
            )}

            <div ref={logsEndRef} />
          </div>

          {/* Footer */}
          <div className="px-5 py-2.5 border-t border-neutral-800 bg-[#141414] flex items-center justify-between shrink-0">
            <span className="text-xs text-neutral-600 font-mono">
              {logEntries.length} line{logEntries.length !== 1 ? "s" : ""}
            </span>
            <span className={`text-xs font-mono ${isBuilding ? "text-yellow-400 animate-pulse" : status === "success" ? "text-green-400" : "text-red-400"}`}>
              ● {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployLogs;