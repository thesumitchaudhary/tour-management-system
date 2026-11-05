import type { Translate } from "@/features/home/types/home.types";
import { Plus } from "lucide-react";

type TripSummaryCardProps = {
  title: string;
  t: Translate;
};

const TripSummaryCard = ({ title, t }: TripSummaryCardProps) => {
  return (
          <div className="rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-lg font-semibold">{title}</h4>
              <button type="button" className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Plus /> {t("dashboard.plan")}
              </button>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {t("dashboard.emptyTrips")} <span>{t("dashboard.planPrompt")}</span>
            </p>
          </div>
  );
};

export default TripSummaryCard;
