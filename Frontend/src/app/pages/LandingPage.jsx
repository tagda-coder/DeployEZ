import { Link } from "react-router";
import {
  GitBranch,
  Globe,
  Terminal,
  Activity,
  Zap,
  Server,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "../../features/shared/components/ThemeToggle";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-(--bg-base) text-(--text-base) flex flex-col font-sans overflow-x-hidden relative selection:bg-indigo-500 selection:text-white">
      {/* Navbar - Render Style (Clean, distinct borders) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-(--bg-base)/90 backdrop-blur-xl border-b-2 border-(--card-border) transition-all">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 rounded bg-indigo-600 flex items-center justify-center transform transition-transform">
              <Server className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-(--text-primary)">
              DeployEZ
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-8 font-semibold text-(--text-muted)">
            <a
              href="#features"
              className="hover:text-indigo-500 transition-colors"
            >
              Platform
            </a>
            <a
              href="#how-it-works"
              className="hover:text-indigo-500 transition-colors"
            >
              Docs
            </a>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <ThemeToggle style="p-2 text-(--text-muted) hover:text-indigo-500 transition-colors" />
          <Link
            to="/"
            className="hidden sm:flex font-bold text-(--text-primary) hover:text-indigo-500 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-2.5 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 rounded-full transition-colors shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section - Render Vibe */}
      <main className="flex-1 flex flex-col lg:flex-row items-center pt-32 lg:pt-40 px-6 lg:px-12 max-w-7xl mx-auto w-full gap-16 relative">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start z-10 w-full lg:w-1/2 pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Zero DevOps Cloud
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[1.05] text-(--text-primary)">
            The easiest cloud for all your apps.
          </h1>
          <p className="mt-6 text-xl text-(--text-muted) max-w-xl leading-relaxed font-medium">
            Build, deploy, and scale your web applications seamlessly. Simply
            connect your GitHub repository and we'll take care of the rest.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-(--text-primary) text-(--bg-base) font-bold rounded-lg hover:opacity-90 transition-all shadow-xl hover:-translate-y-1"
            >
              Start Building for Free
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-(--text-primary) font-bold rounded-lg hover:bg-(--card-bg) transition-colors border-2 border-transparent hover:border-(--card-border)"
            >
              Read the Docs
            </a>
          </div>
        </div>

        {/* Right: Illustration / Code Terminal */}
        <div className="flex-1 w-full lg:w-1/2 relative mt-16 lg:mt-0 z-10">
          {/* Abstract backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full"></div>

          <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center group">
            {/* Terminal Window (Back) */}
            <div className="absolute top-0 right-0 w-[80%] h-[70%] bg-[#0d1117] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden transform translate-x-4 -translate-y-4 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500 ease-out">
              <img
                src="/images/terminal.png"
                alt="broswer image"
                className="w-full h-full object-fit will-change-transform"
              />
            </div>

            {/* Browser Window (Front) */}
            <div className="absolute bottom-0 left-0 w-[85%] h-[75%] bg-(--bg-base) border-2 border-(--card-border) rounded-xl shadow-2xl overflow-hidden transform -translate-x-4 translate-y-4 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-500 ease-out z-20">
              <img
                src="/images/browser.png"
                alt="broswer image"
                className="w-full h-full object-fit will-change-transform"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Feature Blocks - Alternating Layout */}
      <section id="features" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-32">
          {/* Block 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <GitBranch className="w-7 h-7" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-(--text-primary)">
                Deploy automatically <br />
                from Git.
              </h2>
              <p className="mt-6 text-xl text-(--text-muted) leading-relaxed font-medium">
                Connect your GitHub repository to DeployEZ. Every time you push
                code to your main branch, we automatically build and deploy your
                site with zero downtime.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 font-bold text-(--text-primary)">
                  <CheckCircle2 className="w-6 h-6 text-indigo-500" />{" "}
                  Auto-detects frameworks
                </li>
                <li className="flex items-center gap-3 font-bold text-(--text-primary)">
                  <CheckCircle2 className="w-6 h-6 text-indigo-500" /> Preview
                  environments for every PR
                </li>
                <li className="flex items-center gap-3 font-bold text-(--text-primary)">
                  <CheckCircle2 className="w-6 h-6 text-indigo-500" />{" "}
                  Push-to-deploy architecture
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-indigo-500/10 transform rotate-3 rounded-[2rem] -z-10"></div>
              <div className="bg-(--card-bg) border-2 border-(--card-border) rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between pb-6 border-b-2 border-(--card-border)">
                  <div className="flex items-center gap-4">
                    <GithubIcon className="w-10 h-10 text-(--text-primary)" />
                    <div>
                      <div className="font-black text-lg text-(--text-primary)">
                        deployez/frontend-app
                      </div>
                      <div className="text-sm font-bold text-(--text-muted)">
                        main branch
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-green-500/10 text-green-500 font-black text-xs uppercase tracking-widest rounded-full">
                    Connected
                  </div>
                </div>
                <div className="pt-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between p-5 bg-(--bg-base) rounded-xl border-2 border-(--card-border)">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-sm font-bold text-indigo-500">
                        commit 8f9a2b
                      </span>
                      <span className="font-bold text-(--text-primary)">
                        Update landing page UI
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-black text-(--text-primary)">
                      <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>{" "}
                      Deployed
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-(--bg-base) rounded-xl border-2 border-(--card-border) opacity-50">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-sm font-bold text-(--text-muted)">
                        commit 3e1c4d
                      </span>
                      <span className="font-bold text-(--text-primary)">
                        Fix scrollbar bug
                      </span>
                    </div>
                    <div className="text-sm font-bold text-(--text-muted)">
                      Deployed 2h ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1">
              <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-(--text-primary)">
                Global Edge Network.
              </h2>
              <p className="mt-6 text-xl text-(--text-muted) leading-relaxed font-medium">
                Your applications are deployed across our massive global edge
                network out-of-the-box. Deliver your content to users worldwide
                with single-digit millisecond latency.
              </p>
              <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 text-orange-500 font-bold text-lg hover:gap-4 transition-all"
              >
                Explore our infrastructure <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-orange-500/10 transform -rotate-3 rounded-[2rem] -z-10"></div>
              <div className="bg-[#0a0a0a] border-2 border-[#1f1f1f] rounded-2xl p-8 shadow-2xl overflow-hidden relative">
                {/* Decorative Map Grid */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

                <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-orange-500 font-black text-sm tracking-widest uppercase mb-1">
                        Global Latency
                      </div>
                      <div className="text-5xl font-black text-white">
                        12<span className="text-2xl text-neutral-500">ms</span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-end">
                      <div className="w-3 h-10 bg-neutral-800 rounded-t-sm"></div>
                      <div className="w-3 h-16 bg-neutral-800 rounded-t-sm"></div>
                      <div className="w-3 h-8 bg-neutral-800 rounded-t-sm"></div>
                      <div className="w-3 h-20 bg-neutral-800 rounded-t-sm"></div>
                      <div className="w-3 h-12 bg-orange-500 rounded-t-sm"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-900 border-2 border-neutral-800 rounded-xl">
                      <div className="text-neutral-400 font-bold text-xs uppercase tracking-wider mb-2">
                        New York, US
                      </div>
                      <div className="text-white font-black flex items-center justify-between">
                        Active{" "}
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      </div>
                    </div>
                    <div className="p-4 bg-neutral-900 border-2 border-neutral-800 rounded-xl">
                      <div className="text-neutral-400 font-bold text-xs uppercase tracking-wider mb-2">
                        Frankfurt, DE
                      </div>
                      <div className="text-white font-black flex items-center justify-between">
                        Active{" "}
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      </div>
                    </div>
                    <div className="p-4 bg-neutral-900 border-2 border-neutral-800 rounded-xl">
                      <div className="text-neutral-400 font-bold text-xs uppercase tracking-wider mb-2">
                        Tokyo, JP
                      </div>
                      <div className="text-white font-black flex items-center justify-between">
                        Active{" "}
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      </div>
                    </div>
                    <div className="p-4 bg-neutral-900 border-2 border-neutral-800 rounded-xl">
                      <div className="text-neutral-400 font-bold text-xs uppercase tracking-wider mb-2">
                        Sydney, AU
                      </div>
                      <div className="text-white font-black flex items-center justify-between">
                        Active{" "}
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative mt-16 bg-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            Deploy your next big idea.
          </h2>
          <p className="mt-8 text-xl text-indigo-100 font-medium max-w-2xl leading-relaxed">
            Join thousands of developers building fast, reliable web
            applications on DeployEZ. Get started in seconds, free forever for
            personal projects.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-white text-indigo-600 font-black text-lg rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] transition-all"
            >
              Deploy Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-(--bg-base) py-16 px-6 md:px-12 border-t-2 border-(--card-border)">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
                <Server className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-(--text-primary)">
                DeployEZ
              </span>
            </div>
            <p className="text-(--text-muted) font-medium text-sm leading-relaxed pr-4">
              The easiest cloud platform for all your applications, databases,
              and static sites.
            </p>
          </div>

          <div>
            <h4 className="font-black text-lg text-(--text-primary) mb-6">
              Product
            </h4>
            <ul className="space-y-4 text-sm text-(--text-muted) font-bold">
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Web Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Static Sites
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  PostgreSQL
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Redis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg text-(--text-primary) mb-6">
              Resources
            </h4>
            <ul className="space-y-4 text-sm text-(--text-muted) font-bold">
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg text-(--text-primary) mb-6">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-(--text-muted) font-bold">
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t-2 border-(--card-border) flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-black text-(--text-muted)">
          <div className="flex items-center gap-2 px-4 py-2 bg-(--card-bg) border-2 border-(--card-border) rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>{" "}
            All systems operational
          </div>
          <div>&copy; {new Date().getFullYear()} DeployEZ, Inc.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

// Simple SVG for Github logo
const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
