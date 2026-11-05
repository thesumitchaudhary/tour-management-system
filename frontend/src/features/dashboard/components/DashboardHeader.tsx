import type { Translate } from "@/features/home/types/home.types";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHeader = ({ t }: { t: Translate }) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-4 py-4 sm:px-6">
      <h1 className="text-xl font-bold text-primary">Wanderlust</h1>
      <nav aria-label={t("dashboard.navigation")}>
        <ul className="flex flex-wrap gap-5 text-sm font-medium text-muted-foreground">
          <li>
            <Link to={"/user/dashboard"}>{t("nav.home")}</Link>
          </li>
          <li>
            <Link to={"/user/guide"}>{t("nav.travelGuides")}</Link>
          </li>
          <li>
            <Link to={"/user/guide"}>{t("footer.links.hotel")}</Link>
          </li>
          <li>{t("dashboard.deals")}</li>
        </ul>
      </nav>
      <div className="w-full sm:w-auto sm:min-w-64">
        <input
          type="text"
          placeholder={t("dashboard.search")}
          aria-label={t("dashboard.searchLabel")}
          className="h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>
      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label={t("dashboard.notifications")}
          className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Bell />
        </button>
        <div>
          <img
            src="https://i.pinimg.com/236x/be/08/18/be0818bf535e986f2abf49ed61446e48.jpg"
            alt={t("dashboard.profile")}
            className="h-7 w-7 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
