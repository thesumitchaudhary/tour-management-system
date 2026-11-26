import type { RouteObject } from "react-router-dom";
import HomePage from "@/features/home/pages/HomePage";
import UserDashboardPage from "@/features/dashboard/pages/UserDashboardPage";
import GuidesPage from "@/features/guides/pages/GuidesPage";
import HotelsPage from "@/features/hotels/pages/HotelsPage";
import HotelMap from "@/features/hotels/components/HotelMap";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/user/dashboard", element: <UserDashboardPage /> },
  { path: "/user/guide", element: <GuidesPage /> },
  { path: "/user/hotel", element: <HotelsPage /> },
  { path: "/user/hotel/map", element: <HotelMap /> },
  { path: "/admin/dashboard", element: <AdminDashboardPage /> },
];
