import { useTheme } from "../hook/useTheme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ style }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`cursor-pointer z-50 p-2 rounded-full bg-(--card-bg) border border-(--card-border) text-(--text-muted) hover:text-(--text-primary) hover:scale-110 transition-all duration-300 shadow-sm ${style}`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
