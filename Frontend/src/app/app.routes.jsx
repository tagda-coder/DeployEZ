import { createBrowserRouter } from "react-router";

// Layout
import Layout from "../features/shared/components/Layout";

// Pages
import Dashboard from "../features/dashboard/pages/Dashboard";
import Analytics from "../features/dashboard/pages/Analytics";
import ProjectOverview from "../features/dashboard/pages/ProjectOverview";
import DeployLogs from "../features/dashboard/pages/DeployLogs";
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
        path: "project/:id",
        element: <ProjectOverview />,
      },
      {
        path: "project/:projectId/deploy/:deployId",
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
