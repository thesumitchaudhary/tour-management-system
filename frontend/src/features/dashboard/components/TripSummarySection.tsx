import type { Translate } from "@/features/home/types/home.types";
import TripSummaryCard from "./TripSummaryCard";

const TripSummarySection = ({ t }: { t: Translate }) => {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <TripSummaryCard t={t} title={t("dashboard.trips")} />
      <TripSummaryCard t={t} title={t("dashboard.tips")} />
    </section>
  );
};

export default TripSummarySection;
