import { X, Github, GitBranch, UploadCloud } from "lucide-react";
import { useEffect } from "react";

const NewProjectModal = ({ onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-(--bg-base) border border-(--card-border) rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-(--card-border) shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-(--text-primary)">Deploy New Project</h2>
            <p className="text-sm text-(--text-muted) mt-1">Import a Git repository to deploy.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg) rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar flex-1">
          
          <div className="flex flex-col gap-4">
             <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#24292e] hover:bg-[#2f363d] text-white rounded-xl font-medium transition-colors border border-transparent">
               <Github className="w-5 h-5" />
               Continue with GitHub
             </button>
             <div className="relative flex items-center py-2">
               <div className="flex-grow border-t border-(--card-border)"></div>
               <span className="flex-shrink-0 mx-4 text-(--text-muted) text-sm font-medium">OR IMPORT MANUALLY</span>
               <div className="flex-grow border-t border-(--card-border)"></div>
             </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--text-label)">Repository URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Github className="h-4 w-4 text-(--text-muted)" />
              </div>
              <input 
                type="text" 
                placeholder="https://github.com/username/repo"
                className="pl-10 px-4 py-2 w-full bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--input-border-focus) focus:ring-1 focus:ring-(--input-border-focus) text-(--text-primary) transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--text-label)">Branch</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GitBranch className="h-4 w-4 text-(--text-muted)" />
              </div>
              <input 
                type="text" 
                defaultValue="main"
                placeholder="e.g. main, master, prod"
                className="pl-10 px-4 py-2 w-full bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--input-border-focus) focus:ring-1 focus:ring-(--input-border-focus) text-(--text-primary) transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--text-label)">Framework</label>
            <select className="px-4 py-2 bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--input-border-focus) focus:ring-1 focus:ring-(--input-border-focus) text-(--text-primary) transition-all duration-300 appearance-none">
              <option>Auto-detect</option>
              <option>React</option>
              <option>Next.js</option>
              <option>Vue</option>
              <option>Node.js</option>
              <option>Vite</option>
            </select>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-(--card-bg) border-t border-(--card-border) flex justify-end gap-3 rounded-b-2xl shrink-0">
           <button 
             onClick={onClose}
             className="px-4 py-2 bg-transparent text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-base) rounded-lg font-medium transition-colors"
           >
             Cancel
           </button>
           <button 
             onClick={onClose}
             className="flex items-center gap-2 px-5 py-2 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-lg font-medium transition-all duration-300 shadow-md"
           >
             <UploadCloud className="w-4 h-4" />
             Deploy
           </button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;
