import { CloudUpload, ExternalLink, GitCommit, FileText, CheckCircle2, Clock, Terminal, Settings2, Settings as SettingsIcon } from "lucide-react";
import { Link, useParams } from "react-router";
import { useState } from "react";
import Environment from "./Environment";

const ProjectOverview = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("deployments");

  return (
    <div className="flex flex-col gap-6 w-full animate-in slide-in-from-bottom-4 fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 relative z-10 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-(--text-primary)">{id || "deployez-frontend"}</h1>
          <p className="text-(--text-muted) mt-1">Manage project deployments, environments, and settings.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-lg font-medium transition-all duration-300 shadow-md">
          <CloudUpload className="w-4 h-4" />
          <span>New Deploy</span>
        </button>
      </div>

      <div className="flex items-center gap-6 border-b border-(--card-border) relative z-10 w-full mt-2">
        <button 
          onClick={() => setActiveTab("deployments")}
          className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "deployments" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
        >
          <Terminal className="w-4 h-4" /> Deployments
          {activeTab === "deployments" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("environment")}
          className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "environment" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
        >
          <Settings2 className="w-4 h-4" /> Environment
          {activeTab === "environment" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("settings")}
          className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "settings" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
        >
          <SettingsIcon className="w-4 h-4" /> Settings
          {activeTab === "settings" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
        </button>
      </div>

      <div className="mt-4 flex flex-col relative z-10 w-full max-w-6xl">
        {activeTab === "deployments" && (
          <div className="bg-(--card-bg) border border-(--card-border) rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
             <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] p-4 border-b border-(--card-border) bg-(--bg-base) text-sm font-medium text-(--text-muted)">
               <div>Branch</div>
               <div>Commit</div>
               <div>Status / Time</div>
               <div className="text-right">Actions</div>
             </div>
  
             <div className="flex flex-col">
               {[
                 { id: "dep_982bfe12", time: "2 mins ago", status: "Success", branch: "main", commit: "a1b2c3d", commitMsg: "Update UI for Deployments" },
                 { id: "dep_447abc99", time: "1 hour ago", status: "Building", branch: "feat/auth", commit: "4f5g6h7", commitMsg: "Add login page" },
                 { id: "dep_102xyz88", time: "1 day ago", status: "Failed", branch: "main", commit: "8i9j0k1", commitMsg: "Fix styling issues" },
               ].map((dep, i) => (
                  <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center p-5 border-b border-(--card-border) hover:bg-(--bg-base) transition-all duration-300 group">
                    
                    {/* Branch info */}
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${dep.status === 'Success' ? 'bg-(--status-success) text-(--status-success)' : dep.status === 'Building' ? 'bg-(--status-warning) text-(--status-warning) animate-pulse' : 'bg-(--status-error) text-(--status-error)'}`}></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-(--text-primary)">
                          {dep.branch}
                        </span>
                      </div>
                    </div>
  
                    {/* Commit info */}
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-medium font-mono text-(--text-primary)">{dep.commit}</span>
                      <span className="text-xs text-(--text-muted) truncate max-w-[180px] mt-1" title={dep.commitMsg}>{dep.commitMsg}</span>
                    </div>
  
                    {/* Status & Time */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1.5">
                        {dep.status === 'Success' && <CheckCircle2 className="w-3.5 h-3.5 text-(--status-success)" />}
                        {dep.status === 'Building' && <Clock className="w-3.5 h-3.5 text-(--status-warning)" />}
                        {dep.status === 'Failed' && <div className="w-3.5 h-3.5 rounded-full border-2 border-(--status-error) flex items-center justify-center"><div className="w-1 h-1 bg-(--status-error) rounded-full"></div></div>}
                        <span className={`text-sm font-medium ${dep.status === 'Success' ? 'text-(--status-success)' : dep.status === 'Building' ? 'text-(--status-warning)' : 'text-(--status-error)'}`}>
                          {dep.status}
                        </span>
                      </div>
                      <span className="text-xs text-(--text-muted) mt-1">{dep.time}</span>
                    </div>
  
                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={`/project/${id || 'deployez-frontend'}/deploy/${dep.id}`} className="p-2 bg-(--bg-base) border border-(--card-border) rounded-lg hover:border-(--color-accent) hover:text-(--color-accent) transition-colors shadow-sm text-(--text-muted)" title="View Logs">
                         <FileText className="w-4 h-4" />
                      </Link>
                      <a href="#" className="p-2 bg-(--bg-base) border border-(--card-border) rounded-lg hover:border-(--color-accent) hover:text-(--color-accent) transition-colors shadow-sm text-(--text-muted)" title="Open URL">
                         <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === "environment" && (
          <div className="animate-in fade-in duration-300">
             <Environment />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-(--card-bg) border border-(--card-border) rounded-2xl p-6 text-(--text-muted) animate-in fade-in duration-300">
             Project settings will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectOverview;
