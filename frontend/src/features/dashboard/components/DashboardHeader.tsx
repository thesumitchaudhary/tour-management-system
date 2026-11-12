import type { Translate } from "@/features/home/types/home.types";
import { Dialog } from "@base-ui/react/dialog";
import { Bell, X } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileForm from "./ProfileForm";

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
            <Link to={"/user/hotel"}>{t("footer.links.hotel")}</Link>
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
        <Dialog.Root>
          <Dialog.Trigger
            aria-label={t("dashboard.profile")}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
          <img
            src="https://i.pinimg.com/236x/be/08/18/be0818bf535e986f2abf49ed61446e48.jpg"
            alt={t("dashboard.profile")}
            className="h-7 w-7 rounded-full object-cover"
          />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
            <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xl">
              <Dialog.Close
                aria-label={t("dashboard.closeProfile")}
                className="absolute top-3 right-3 inline-flex size-9 cursor-pointer items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-5" />
              </Dialog.Close>
              <div className="flex flex-col items-center gap-4 pt-4">
                <img
                  src="https://i.pinimg.com/236x/be/08/18/be0818bf535e986f2abf49ed61446e48.jpg"
                  alt=""
                  className="size-24 rounded-full object-cover"
                />
                <Dialog.Title className="text-xl font-semibold">
                  {t("dashboard.profile")}
                </Dialog.Title>
              </div>
              <ProfileForm />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
};

export default DashboardHeader;
