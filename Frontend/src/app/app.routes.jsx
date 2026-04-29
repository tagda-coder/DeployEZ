import { createBrowserRouter } from "react-router";

// Pages
import Dashboard from "../features/dashboard/pages/Dashboard";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
