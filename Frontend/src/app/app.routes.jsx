import { createBrowserRouter } from "react-router";

// Layout
import Layout from "../features/shared/components/Layout";

// Pages
import ProjectOverview from "../features/dashboard/pages/ProjectOverview";
import DeployLogs from "../features/dashboard/pages/DeployLogs"; 
import Analytics from "../features/dashboard/pages/Analytics";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Auth from "../features/auth/pages/Auth";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";

// Components
import Protected from "../features/auth/components/Protected";
import Guest from "../features/auth/components/Guest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Protected>
         <Dashboard />
        </Protected>
      },
      {
        path: "analytics",
        element: <Analytics />
      },
      {
        path: "project/:id",
        element: <ProjectOverview />,
      },
      {
        path: "project/:projectId/deploy/:deployId",
        element: <DeployLogs />,
      },
    ]
  },
  {
    path: "/landing",
    element: <Guest>  
      <LandingPage />
      </Guest>
  },
  {
    path: "/auth",
    element: <Guest>  
      <Auth />
      </Guest>
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
