import { Link } from "react-router";
import { ServerCrash, ArrowLeft, Home, Terminal } from "lucide-react";
import { ThemeToggle } from "../../features/shared/components/ThemeToggle";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-(--bg-base) text-(--text-base) flex flex-col font-sans overflow-hidden relative selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar (Minimal for Error Page) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-(--bg-base)/90 backdrop-blur-xl border-b-2 border-(--card-border)">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded bg-indigo-600 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
              <ServerCrash className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-(--text-primary)">DeployEZ</span>
          </Link>
        </div>
        <div>
          <ThemeToggle style="p-2 text-(--text-muted) hover:text-indigo-500 transition-colors" />
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pt-20">
        
        {/* Abstract backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/20 to-red-500/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

        <div className="text-center max-w-2xl w-full">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-tight text-(--text-primary) mb-6">
            Page not found.
          </h1>
          
          <p className="text-xl text-(--text-muted) leading-relaxed font-medium mb-12">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="w-full max-w-lg mx-auto bg-[#0d1117] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden mb-12 text-left transform hover:-translate-y-1 transition-transform">
             <div className="flex items-center px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-gray-400">~/deployez/router</span>
             </div>
             <div className="p-4 font-mono text-sm leading-relaxed">
                <div className="text-indigo-400">$ curl -I https://deployez.com/current-path</div>
                <div className="text-red-400 mt-2 font-bold">HTTP/2 404 Not Found</div>
                <div className="text-gray-300">content-type: text/html; charset=utf-8</div>
                <div className="text-gray-300">server: DeployEZ Edge Network</div>
                <div className="text-green-400 mt-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Ready <span className="animate-pulse">_</span>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-(--card-bg) border-2 border-(--card-border) text-(--text-primary) font-bold rounded-lg hover:border-indigo-500 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" /> Go Back
            </button>
            <Link 
              to="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 border-2 border-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 hover:border-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
            >
              <Home className="w-5 h-5" /> Return Home
            </Link>
          </div>
          
        </div>
      </main>
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-20"></div>
    </div>
  );
};

export default ErrorPage;
