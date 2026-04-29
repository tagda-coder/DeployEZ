import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";

// Providers
import { ThemeProvider } from "./app/theme.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
