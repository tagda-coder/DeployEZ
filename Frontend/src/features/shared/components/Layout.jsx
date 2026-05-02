import { Outlet, NavLink } from "react-router";
import {
  LayoutDashboard,
  BarChart2,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import BackgroundPattern from "./BackgroundPattern";
import { ThemeToggle } from "./ThemeToggle"; 
import SettingsModal from "../../dashboard/pages/SettingsModal"

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const menuRef = useRef(null);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowUserMenu(false);
        setShowSettingsModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navItems = [
    { name: "Projects", path: "/", icon: LayoutDashboard },
    { name: "Analytics", path: "/analytics", icon: BarChart2 },
  ];

  return (
    <div className="flex h-screen w-full bg-(--bg-base) text-(--text-base) overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${isCollapsed ? "w-20" : "w-64"} relative border-r border-(--sidebar-border) bg-(--sidebar-bg) flex flex-col justify-between py-6 shrink-0 transition-[width] duration-300 ease-in-out z-20 shadow-sm`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div
            className={`flex items-center mb-10 px-5 whitespace-nowrap overflow-hidden transition-all duration-300`}
          >
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg) rounded-xl transition-colors outline-none"
            >
              {isCollapsed ? (
                <PanelLeft className="w-6 h-6" />
              ) : (
                <PanelLeftClose className="w-6 h-6" />
              )}
            </button>
            {!isCollapsed && (
              <span className="text-xl font-semibold tracking-wide text-(--text-primary) animate-in fade-in duration-300">
                DeployEZ
              </span>
            )}
          </div>

          <nav className="flex flex-col gap-2 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-medium group overflow-hidden whitespace-nowrap ${
                    isActive
                      ? "bg-(--card-bg) text-(--text-primary) shadow-sm border border-(--card-border)"
                      : "text-(--sidebar-text) hover:bg-(--card-bg) hover:text-(--text-muted-hover)"
                  }`
                }
                title={isCollapsed ? item.name : ""}
              >
                <item.icon className="w-5 h-5 opacity-80 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span
                  className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
                >
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-4 mt-auto">
          <div className="pt-6 border-t border-(--sidebar-border) relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-(--card-bg) transition-colors overflow-hidden whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-full bg-(--card-bg) border border-(--card-border) flex items-center justify-center text-sm font-semibold shrink-0">
                US
              </div>
              <div
                className={`flex flex-col items-start transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}
              >
                <span className="text-sm font-medium text-(--text-primary)">
                  User
                </span>
                <span className="text-xs text-(--text-muted)">Pro Plan</span>
              </div>
            </button>

            {/* User Settings Modal / Popover */}
            {showUserMenu && (
              <div
                ref={menuRef}
                className="absolute bottom-full left-4 mb-2 w-56 bg-(--card-bg) border border-(--card-border) rounded-xl shadow-lg flex flex-col p-2 animate-in fade-in slide-in-from-bottom-2 z-50"
              >
                <div className="px-3 py-2 border-b border-(--card-border) mb-2">
                  <p className="text-sm font-semibold text-(--text-primary)">
                    user@deployez.com
                  </p>
                </div>

                <div className="flex items-center justify-between px-3 py-2 hover:bg-(--bg-base) rounded-lg transition-colors cursor-default">
                  <span className="text-sm font-medium text-(--text-muted)">
                    Theme
                  </span>
                  <ThemeToggle style="p-1.5" />
                </div>

                <button
                  onClick={() => {
                    setShowSettingsModal(true);
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-base) rounded-lg transition-colors w-full text-left"
                >
                  <SettingsIcon className="w-4 h-4" />
                  Account Settings
                </button>

                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left mt-1">
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        <BackgroundPattern />
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-10 w-full mx-auto max-w-[1600px]">
          <Outlet />
        </div>
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}
    </div>
  );
};

export default Layout;
