import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";

// Providers
import { ThemeProvider } from "./features/shared/context/theme.context.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,
);
