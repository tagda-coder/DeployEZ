import { useState } from "react";
import { Plus, Eye, EyeOff, Trash2, Key } from "lucide-react";

const Environment = () => {
  const [showValues, setShowValues] = useState(false);
  const [envs, setEnvs] = useState([
    { key: "DATABASE_URL", value: "postgresql://user:pass@db.deployez.com:5432/main" },
    { key: "API_SECRET_KEY", value: "sk_live_1234567890abcdef" },
    { key: "NEXT_PUBLIC_API_URL", value: "https://api.deployez.com" },
  ]);

  return (
    <div className="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-4 fade-in duration-500 pb-10">
      
      {/* Header removed for nested view */}

      <div className="mt-4 flex flex-col relative z-10 w-full max-w-5xl">
        <div className="bg-(--card-bg) border border-(--card-border) rounded-2xl overflow-hidden shadow-sm">
           
           <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-(--card-border) bg-(--bg-base) gap-4">
             <div className="flex items-center gap-3 text-(--text-primary) font-medium">
                <Key className="w-5 h-5 text-(--color-accent) shrink-0" />
                <span>Production Variables</span>
             </div>
             <div className="flex flex-wrap items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
               <button 
                  onClick={() => setShowValues(!showValues)}
                  className="flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors"
               >
                  {showValues ? <EyeOff className="w-4 h-4 shrink-0" /> : <Eye className="w-4 h-4 shrink-0" />}
                  <span className="whitespace-nowrap">{showValues ? 'Hide Values' : 'Reveal Values'}</span>
               </button>
               <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-md font-medium transition-all duration-300 shadow-sm border border-(--card-border) whitespace-nowrap">
                 <Plus className="w-3.5 h-3.5 shrink-0" />
                 <span>Add Variable</span>
               </button>
             </div>
           </div>

           <div className="flex flex-col p-5 gap-4 bg-(--card-bg)">
              {envs.map((env, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 group p-4 md:p-0 bg-(--bg-base) md:bg-transparent rounded-xl md:rounded-none border border-(--card-border) md:border-none">
                  
                  {/* Mobile Header per row */}
                  <div className="flex md:hidden items-center justify-between mb-1 border-b border-(--card-border) pb-2">
                    <span className="text-xs font-semibold text-(--text-muted) tracking-wider uppercase">Variable</span>
                    <button className="p-1.5 text-(--text-muted) hover:text-(--status-error) hover:bg-(--status-error-bg) rounded-md transition-all shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-(--text-muted) select-none">KEY</span>
                    <input 
                      type="text" 
                      value={env.key}
                      readOnly
                      className="w-full pl-12 pr-4 py-2.5 bg-(--input-bg) border border-(--input-border) rounded-lg text-sm font-mono text-(--text-primary) focus:outline-none focus:border-(--color-accent) transition-all"
                    />
                  </div>
                  
                  <div className="flex-1 flex items-center gap-3 md:gap-4 mt-2 md:mt-0">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-(--text-muted) select-none">VAL</span>
                      <input 
                        type={showValues ? "text" : "password"} 
                        value={env.value}
                        readOnly
                        className="w-full pl-12 pr-4 py-2.5 bg-(--input-bg) border border-(--input-border) rounded-lg text-sm font-mono text-(--text-primary) focus:outline-none focus:border-(--color-accent) transition-all"
                      />
                    </div>
                    {/* Delete button (Desktop inline) */}
                    <button className="hidden md:flex p-2.5 text-(--text-muted) hover:text-(--status-error) hover:bg-(--status-error-bg) rounded-lg transition-all shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="p-5 border-t border-(--card-border) bg-(--bg-base) text-sm text-(--text-muted)">
             <p>Variables are encrypted at rest and injected during build and runtime.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Environment;
