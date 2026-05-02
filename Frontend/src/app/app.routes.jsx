import { createBrowserRouter } from "react-router";

// Layout
import Layout from "../features/shared/components/Layout";

// Pages
import Dashboard from "../features/dashboard/pages/Dashboard";
import Analytics from "../features/dashboard/pages/Analytics";
import Deploy from "../features/dashboard/pages/Deploy";
import DeployLogs from "../features/dashboard/pages/DeployLogs";
import Environment from "../features/dashboard/pages/Environment";
import Settings from "../features/dashboard/pages/Settings";
import Auth from "../features/auth/pages/Auth";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "deploy",
        element: <Deploy />,
      },
      {
        path: "deploy/:id",
        element: <DeployLogs />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ]
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
