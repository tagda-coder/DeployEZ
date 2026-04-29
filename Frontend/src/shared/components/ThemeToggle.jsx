import { useTheme } from "../hook/useTheme";
import { Moon, Sun } from "lucide-react";

// styles
import "../styles/theme-toggle.scss";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button onClick={toggleTheme} className="toggle">
      {isDark ? <Sun className="icon" /> : <Moon className="icon" />}
    </button>
  );
}
