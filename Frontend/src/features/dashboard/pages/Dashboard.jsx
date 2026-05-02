import { Plus, Globe, ExternalLink, Activity, ArrowRight, Server } from "lucide-react";
import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 relative z-10 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-(--text-primary)">Overview</h1>
          <p className="text-(--text-muted) mt-1">Manage your applications and deployments.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/deploy" className="group flex items-center gap-2 px-5 py-2.5 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-lg font-medium transition-all duration-300 shadow-md">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Stats/Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full">
        <div className="bg-(--card-bg) border border-(--card-border) p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-(--text-muted)">Total Projects</span>
            <div className="w-8 h-8 rounded-full bg-(--status-success-bg) text-(--status-success) flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-(--text-primary)">8</h3>
            <p className="text-xs text-(--status-success) mt-1 font-medium">+2 this week</p>
          </div>
        </div>

        <div className="bg-(--card-bg) border border-(--card-border) p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-(--text-muted)">Active Deployments</span>
            <div className="w-8 h-8 rounded-full bg-(--status-warning-bg) text-(--status-warning) flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-(--text-primary)">24</h3>
            <p className="text-xs text-(--text-muted) mt-1 font-medium">Avg build time: 42s</p>
          </div>
        </div>

        <div className="bg-(--card-bg) border border-(--card-border) p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-(--text-muted)">System Status</span>
            <div className="w-3 h-3 rounded-full bg-(--status-success) animate-pulse shadow-[0_0_8px_var(--status-success)]"></div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-(--text-primary)">All systems operational</h3>
            <p className="text-xs text-(--text-muted) mt-1 font-medium">Last checked 2 mins ago</p>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col relative z-10 w-full mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-(--text-primary)">Recent Projects</h2>
          <Link to="/analytics" className="text-sm font-medium text-(--text-muted) hover:text-(--text-primary) flex items-center gap-1 transition-colors">
            View Analytics <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            { name: "deployez-frontend", framework: "React", time: "2h ago", branch: "main", url: "deployez-frontend.vercel.app" },
            { name: "api-gateway-service", framework: "Node.js", time: "5h ago", branch: "production", url: "api.deployez.com" },
            { name: "marketing-site", framework: "Next.js", time: "1d ago", branch: "main", url: "deployez.com" },
          ].map((project, i) => (
            <div key={i} className="group bg-(--card-bg) border border-(--card-border) rounded-2xl p-6 hover:shadow-lg hover:border-(--color-accent) transition-all duration-300 cursor-pointer flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-(--bg-base) border border-(--card-border) flex items-center justify-center">
                    <Globe className="w-5 h-5 text-(--text-primary)" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-(--text-primary) group-hover:text-(--color-accent) transition-colors">{project.name}</h3>
                    <p className="text-xs text-(--text-muted)">{project.url}</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-(--status-success)"></div>
              </div>

              <div className="flex items-center gap-4 text-sm text-(--text-muted)">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                  <span>{project.branch}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>•</span>
                  <span>{project.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 pt-4 border-t border-(--sidebar-border)">
                <span className="text-xs font-medium px-2.5 py-1 bg-(--bg-base) rounded-md text-(--text-muted)">{project.framework}</span>
                <a href={`https://${project.url}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-md hover:bg-(--bg-base) text-(--text-muted) hover:text-(--text-primary) transition-colors" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
