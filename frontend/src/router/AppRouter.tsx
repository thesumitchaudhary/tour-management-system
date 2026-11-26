import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "@/app/routes";
function RouteContent() { return useRoutes(routes); }
export default function AppRouter() {
  return <BrowserRouter><RouteContent /></BrowserRouter>;
}
