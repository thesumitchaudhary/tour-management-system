import ReactPlayer from "react-player";
import { CheckCircle2 } from "lucide-react";
import type { Translate } from "../types/home.types";

const mapItems = [
  "map.item.schedules",
  "map.item.guides",
  "map.item.bookings",
  "map.item.notes",
];

type MapPlanningSectionProps = {
  t: Translate;
};

const MapPlanningSection = ({ t }: MapPlanningSectionProps) => {
  return (
    <section id="why-us" className="border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">{t("map.eyebrow")}</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
            {t("map.title")}
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{t("map.description")}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {mapItems.map((itemKey) => (
              <div key={itemKey} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="size-5 text-primary" />
                {t(itemKey)}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl">
          <div className="aspect-video bg-muted">
            <ReactPlayer
              src="https://www.youtube.com/shorts/XJeOMVJr1Cc"
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPlanningSection;
