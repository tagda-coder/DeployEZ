import { createBrowserRouter } from "react-router";

// Pages
import Dashboard from "../features/dashboard/pages/Dashboard";
import Auth from "../features/auth/pages/Auth";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
