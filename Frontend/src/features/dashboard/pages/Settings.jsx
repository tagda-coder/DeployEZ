const Settings = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-in slide-in-from-right-8 fade-in duration-500">
      <div className="mt-8 flex flex-col relative z-10 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6 text-(--text-primary)">Settings</h1>
        
        <div className="bg-(--card-bg) border border-(--card-border) rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-(--card-border)">
            <h2 className="text-lg font-medium text-(--text-primary)">General</h2>
            <p className="text-sm text-(--text-muted) mt-1">Manage your team and preferences.</p>
          </div>
          
          <div className="p-6 flex flex-col gap-6">
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
          
          <div className="px-6 py-4 bg-(--bg-base) border-t border-(--card-border) flex justify-end">
             <button className="px-5 py-2 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover) hover:text-(--btn-primary-text-hover) rounded-lg font-medium transition-all duration-300 shadow-md">
               Save Changes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
