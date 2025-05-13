import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import routes from "../src/routes/routes";
import { LoginPage } from "./features/auth/Login";
import { RegisterPage } from "./features/auth/Register";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./routes/ProtectedRoute";

import "./index.css";

const router = createBrowserRouter([
  {
    path: routes.auth.register,
    element: <RegisterPage />,
  },
  {
    path: routes.auth.login,
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes.auth.login} replace />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
