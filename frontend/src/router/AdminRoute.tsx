import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
export default function AdminRoute({ isAdmin, children }: { isAdmin: boolean; children?: ReactNode }) {
  return isAdmin ? (children ?? <Outlet />) : <Navigate to="/" replace />;
}
