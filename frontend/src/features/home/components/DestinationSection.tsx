import { destinationGroups } from "../data/destination.data";
import type { Translate } from "../types/home.types";

type DestinationSectionProps = {
  t: Translate;
};

const DestinationSection = ({ t }: DestinationSectionProps) => {
  return (
    <section id="destinations" className="bg-secondary/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">
            {t("destinations.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            {t("destinations.title")}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {destinationGroups.map((group) => (
            <div key={group.titleKey} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-bold">{t(group.titleKey)}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.places.map((place) => (
                  <a
                    key={place}
                    href="#home"
                    className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
                  >
                    {place}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
