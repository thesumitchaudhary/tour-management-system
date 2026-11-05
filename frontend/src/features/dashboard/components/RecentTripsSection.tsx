import type { Translate } from "@/features/home/types/home.types";
import { Plus } from "lucide-react";

const RecentTripsSection = ({ t }: { t: Translate }) => {
  return (
        <section className="rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">{t("dashboard.recent")}</h3>
            <button type="button" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <Plus /> {t("dashboard.plan")}
            </button>
          </div>
          <p className="mt-5 rounded-md bg-accent/50 p-4 text-sm leading-6 text-muted-foreground">
            {t("dashboard.emptyRecent")} {" "}
            <span className="font-semibold text-foreground">
              {t("dashboard.planPrompt")}
            </span>
          </p>
        </section>
  );
};

export default RecentTripsSection;
