import { X, GitPullRequest, UploadCloud, FolderUp, GitBranch, ArrowRight, FolderArchive, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { useProjects } from "../../../context/ProjectContext";

const NewProjectModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("github"); // "github" | "upload"
  const [selectedRepo, setSelectedRepo] = useState("");
  const { addProject } = useProjects();
  const navigate = useNavigate();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fakeRepos = [
    { name: "deployez-frontend", updated: "2h ago", private: false },
    { name: "api-gateway-service", updated: "1d ago", private: true },
    { name: "marketing-site", updated: "3d ago", private: false },
    { name: "legacy-dashboard", updated: "2w ago", private: true },
  ];

  const handleDeploy = () => {
    const projectName = selectedRepo || (activeTab === "upload" ? "uploaded-project" : "deployez-frontend");
    const newProject = addProject({
      name: projectName,
      framework: "React",
      branch: "main"
    });
    onClose();
    navigate(`/project/${newProject.id}`);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-(--bg-base) border border-(--card-border) rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-(--card-border) shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-(--text-primary)">Deploy New Project</h2>
            <p className="text-sm text-(--text-muted) mt-1">Import a Git repository or upload project files directly.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg) rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-(--card-border) shrink-0 pt-2">
          <button 
            onClick={() => setActiveTab("github")}
            className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "github" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
          >
            <GitPullRequest className="w-4 h-4" /> Import Repository
            {activeTab === "github" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab("upload")}
            className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "upload" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
          >
            <FolderUp className="w-4 h-4" /> Upload Files
            {activeTab === "upload" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar flex-1 bg-(--card-bg)">
          
          {activeTab === "github" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between p-4 border border-(--card-border) bg-(--bg-base) rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#24292e] flex items-center justify-center text-white">
                    <GitPullRequest className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-(--text-primary)">mayank-user</h3>
                    <p className="text-xs text-(--text-muted)">Connected GitHub Account</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-(--color-accent) hover:underline">Change</button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-(--text-label)">Select a Repository</label>
                  <div className="relative">
                     <input 
                       type="text" 
                       placeholder="Search repos..."
                       className="px-3 py-1.5 text-sm bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--color-accent) text-(--text-primary) transition-all duration-300 w-48"
                     />
                  </div>
                </div>

                <div className="flex flex-col border border-(--card-border) rounded-xl overflow-hidden bg-(--bg-base)">
                  {fakeRepos.map((repo, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedRepo(repo.name)}
                      className={`flex items-center justify-between p-4 border-b border-(--card-border) cursor-pointer transition-colors ${selectedRepo === repo.name ? 'bg-(--color-accent)/10' : 'hover:bg-(--card-bg)'} last:border-b-0`}
                    >
                      <div className="flex items-center gap-3">
                        <GitPullRequest className="w-5 h-5 text-(--text-muted)" />
                        <span className="font-medium text-(--text-primary)">{repo.name}</span>
                        {repo.private && <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-(--card-bg) border border-(--card-border) text-(--text-muted) rounded-md">Private</span>}
                      </div>
                      {selectedRepo === repo.name ? (
                        <span className="text-sm font-medium text-(--color-accent) flex items-center gap-1">Selected <CheckCircle2 className="w-4 h-4" /></span>
                      ) : (
                        <span className="text-xs text-(--text-muted)">{repo.updated}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300 h-full">
               <div className="flex-1 border-2 border-dashed border-(--card-border) hover:border-(--color-accent) rounded-2xl flex flex-col items-center justify-center gap-4 p-10 bg-(--bg-base) transition-colors cursor-pointer group min-h-[300px]">
                 <div className="w-16 h-16 rounded-full bg-(--card-bg) border border-(--card-border) flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                   <FolderArchive className="w-8 h-8 text-(--color-accent)" />
                 </div>
                 <div className="text-center">
                   <h3 className="text-lg font-semibold text-(--text-primary)">Drag & Drop your project folder</h3>
                   <p className="text-sm text-(--text-muted) mt-1">Or click to browse files from your computer</p>
                 </div>
                 <div className="flex items-center gap-2 text-xs font-medium text-(--text-muted) bg-(--card-bg) px-3 py-1.5 rounded-full border border-(--card-border)">
                   <span>Supported: React, Next.js, Vite, Node, HTML/CSS</span>
                 </div>
               </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-(--bg-base) border-t border-(--card-border) flex justify-end gap-3 rounded-b-2xl shrink-0">
           <button 
             onClick={onClose}
             className="px-4 py-2 bg-transparent text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg) rounded-lg font-medium transition-colors"
           >
             Cancel
           </button>
           <button 
             onClick={handleDeploy}
             className="flex items-center gap-2 px-5 py-2 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-lg font-medium transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <UploadCloud className="w-4 h-4" />
             Deploy Project
           </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NewProjectModal;
