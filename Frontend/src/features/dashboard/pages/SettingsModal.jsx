import { X, User, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SettingsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-(--bg-base) border border-(--card-border) rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-(--card-border) shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-(--text-primary)">Settings</h2>
            <p className="text-sm text-(--text-muted) mt-1">Manage your account and workspace preferences.</p>
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
            onClick={() => setActiveTab("profile")}
            className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "profile" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
          >
            <User className="w-4 h-4" /> Profile
            {activeTab === "profile" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab("workspace")}
            className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === "workspace" ? "text-(--text-primary)" : "text-(--text-muted) hover:text-(--text-primary)"}`}
          >
            <Briefcase className="w-4 h-4" /> Workspace
            {activeTab === "workspace" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-(--color-accent) rounded-t-full"></div>}
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar flex-1">
          {activeTab === "profile" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-(--card-bg) border border-(--card-border) flex items-center justify-center text-xl font-bold text-(--text-primary)">
                  US
                </div>
                <button className="px-4 py-2 bg-(--bg-base) border border-(--card-border) text-(--text-primary) hover:border-(--color-accent) rounded-lg font-medium transition-all duration-300 text-sm">
                  Change Avatar
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-(--text-label)">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="User"
                  className="px-4 py-2 bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--input-border-focus) focus:ring-1 focus:ring-(--input-border-focus) text-(--text-primary) transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-(--text-label)">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="user@deployez.com"
                  className="px-4 py-2 bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--input-border-focus) focus:ring-1 focus:ring-(--input-border-focus) text-(--text-primary) transition-all duration-300"
                />
              </div>
            </div>
          )}

          {activeTab === "workspace" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-(--text-label)">Team Name</label>
                <input 
                  type="text" 
                  defaultValue="DeployEZ Workspace"
                  className="px-4 py-2 bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--input-border-focus) focus:ring-1 focus:ring-(--input-border-focus) text-(--text-primary) transition-all duration-300"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-(--text-label)">Default Region</label>
                <select className="px-4 py-2 bg-(--input-bg) border border-(--input-border) rounded-lg focus:outline-none focus:border-(--input-border-focus) focus:ring-1 focus:ring-(--input-border-focus) text-(--text-primary) transition-all duration-300 appearance-none">
                  <option>US East (N. Virginia)</option>
                  <option>US West (Oregon)</option>
                  <option>EU (Frankfurt)</option>
                </select>
              </div>
            </div>
          )}
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
             onClick={onClose}
             className="px-5 py-2 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-lg font-medium transition-all duration-300 shadow-md"
           >
             Save Changes
           </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SettingsModal;
