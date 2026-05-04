import { ToastContainer, Zoom } from "react-toastify"; 
import { router } from "./app.routes"; 
import { useEffect } from "react";

// Providers
import { RouterProvider } from "react-router";

// styles
import "./app.css";
import { useTheme } from "../features/shared/hook/useTheme";
import { useAuth } from "../features/auth/hook/useAuth";

function App() {
  const { handleInitAuth } = useAuth();

  useEffect(() => {
    handleInitAuth();
  }, []);

  const { theme } = useTheme();

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "light" : "dark"}
        transition={Zoom}
      />
    </>
  );
}

export default App;
