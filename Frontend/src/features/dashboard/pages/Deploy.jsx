import { CloudUpload, ExternalLink, GitCommit, FileText, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router";

const Deploy = () => {
  return (
    <div className="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-4 fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 relative z-10 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-(--text-primary)">Deployments</h1>
          <p className="text-(--text-muted) mt-1">View and manage your recent deployment history.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-lg font-medium transition-all duration-300 shadow-md">
          <CloudUpload className="w-4 h-4" />
          <span>New Deploy</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col relative z-10 w-full max-w-6xl">
        <div className="bg-(--card-bg) border border-(--card-border) rounded-2xl overflow-hidden shadow-sm">
           
           <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] p-4 border-b border-(--card-border) bg-(--bg-base) text-sm font-medium text-(--text-muted)">
             <div>Project / Branch</div>
             <div>Commit</div>
             <div>Status / Time</div>
             <div className="text-right">Actions</div>
           </div>

           <div className="flex flex-col">
             {[
               { id: "dep_982bfe12", project: "deployez-frontend", time: "2 mins ago", status: "Success", branch: "main", commit: "a1b2c3d", commitMsg: "Update UI for Deployments" },
               { id: "dep_447abc99", project: "api-gateway-service", time: "1 hour ago", status: "Building", branch: "main", commit: "4f5g6h7", commitMsg: "Fix CORS issue on gateway" },
               { id: "dep_102xyz88", project: "marketing-site", time: "1 day ago", status: "Failed", branch: "feat/landing", commit: "8i9j0k1", commitMsg: "Add new hero section" },
               { id: "dep_884opq11", project: "deployez-backend", time: "2 days ago", status: "Success", branch: "production", commit: "2l3m4n5", commitMsg: "Optimize database queries" },
             ].map((dep, i) => (
                <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center p-5 border-b border-(--card-border) hover:bg-(--bg-base) transition-all duration-300 group">
                  
                  {/* Project info */}
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${dep.status === 'Success' ? 'bg-(--status-success) text-(--status-success)' : dep.status === 'Building' ? 'bg-(--status-warning) text-(--status-warning) animate-pulse' : 'bg-(--status-error) text-(--status-error)'}`}></div>
                    <div className="flex flex-col">
                      <Link to={`/deploy/${dep.id}`} className="font-semibold text-(--text-primary) hover:text-(--color-accent) transition-colors flex items-center gap-1.5">
                        {dep.project}
                      </Link>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-(--text-muted)">
                        <GitCommit className="w-3 h-3" />
                        <span>{dep.branch}</span>
                      </div>
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
                    <Link to={`/deploy/${dep.id}`} className="p-2 bg-(--bg-base) border border-(--card-border) rounded-lg hover:border-(--color-accent) hover:text-(--color-accent) transition-colors shadow-sm text-(--text-muted)" title="View Logs">
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
      </div>
    </div>
  );
};

export default Deploy;
