import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute({ isAuthenticated, children }: { isAuthenticated: boolean; children?: ReactNode }) {
  return isAuthenticated ? (children ?? <Outlet />) : <Navigate to="/" replace />;
}
