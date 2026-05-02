import { useParams, Link } from "react-router";
import { ArrowLeft, RefreshCw, Terminal, Settings2 } from "lucide-react";
import { useState, useEffect } from "react";
import Environment from "./Environment";

const DeployLogs = () => {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);
  const [isBuilding, setIsBuilding] = useState(true);
  const [activeTab, setActiveTab] = useState("logs");

  // Dummy log simulation
  useEffect(() => {
    const initialLogs = [
      `[INFO] Starting deployment for id: ${id}`,
      `[INFO] Cloning repository...`,
      `[INFO] Repository cloned successfully.`,
      `[INFO] Installing dependencies using npm...`,
    ];
    setLogs(initialLogs);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const newLogs = [
        `[INFO] Building project (step ${step})...`,
        `[WARN] Skipping optional dependency.`,
        `[INFO] Build step ${step} completed.`
      ];
      setLogs((prev) => [...prev, newLogs[step % 3]]);
      
      if (step > 5) {
        setLogs((prev) => [...prev, `[SUCCESS] Deployment complete. Site is live!`]);
        setIsBuilding(false);
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-right-4 duration-500 pb-10 h-full max-h-[calc(100vh-6rem)]">
      
      <div className="flex items-center gap-4 mt-4 relative z-10 w-full shrink-0">
        <Link to="/deploy" className="p-2 bg-(--card-bg) border border-(--card-border) rounded-lg hover:border-(--color-accent) transition-all duration-300 text-(--text-muted) hover:text-(--text-primary)">
           <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
             <h1 className="text-2xl font-bold tracking-tight text-(--text-primary)">deployez-frontend</h1>
             <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${isBuilding ? 'bg-(--status-warning-bg) text-(--status-warning) animate-pulse' : 'bg-(--status-success-bg) text-(--status-success)'}`}>
               {isBuilding ? 'Building' : 'Success'}
             </span>
          </div>
          <p className="text-sm text-(--text-muted) mt-1 font-mono">ID: {id} • branch: main</p>
        </div>
        <div className="ml-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-(--card-bg) border border-(--card-border) text-(--text-primary) hover:border-(--color-accent) rounded-lg font-medium transition-all duration-300 text-sm">
            <RefreshCw className={`w-4 h-4 ${isBuilding ? 'animate-spin text-(--color-accent)' : ''}`} />
            <span>{isBuilding ? 'Building...' : 'Re-deploy'}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-(--card-border) relative z-10 w-full shrink-0">
        <button 
          onClick={() => setActiveTab("logs")}
          className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "logs" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
        >
          <Terminal className="w-4 h-4" /> Logs
          {activeTab === "logs" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("environment")}
          className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "environment" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
        >
          <Settings2 className="w-4 h-4" /> Environment
          {activeTab === "environment" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex-1 relative z-10 w-full flex flex-col min-h-0">
        {activeTab === "logs" && (
          <div className="flex-1 flex flex-col bg-(--terminal-bg) rounded-2xl overflow-hidden shadow-lg border border-(--card-border) min-h-[500px]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800 bg-[#1a1a1a]">
              <Terminal className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-400">Build Terminal</span>
            </div>
            <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-(--terminal-text) flex flex-col gap-1.5 custom-scrollbar">
               {logs.map((log, i) => (
                 <div key={i} className={`flex gap-3 ${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[WARN]') ? 'text-yellow-400' : log.includes('[SUCCESS]') ? 'text-green-400' : ''}`}>
                    <span className="opacity-50 select-none text-xs mt-0.5">{(new Date()).toISOString().split('T')[1].slice(0,-1)}</span>
                    <span className="whitespace-pre-wrap">{log}</span>
                 </div>
               ))}
               {isBuilding && (
                 <div className="flex gap-3 mt-2 animate-pulse text-(--terminal-prompt)">
                   <span className="opacity-50 select-none text-xs mt-0.5">{(new Date()).toISOString().split('T')[1].slice(0,-1)}</span>
                   <span>_</span>
                 </div>
               )}
            </div>
          </div>
        )}

        {activeTab === "environment" && (
          <div className="flex-1 animate-in fade-in duration-300">
             <Environment />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeployLogs;
