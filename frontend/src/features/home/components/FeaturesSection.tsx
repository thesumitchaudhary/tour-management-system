import { ArrowRight, Download } from "lucide-react";
import { features } from "../data/features.data";
import type { OpenAuthModal, Translate } from "../types/home.types";

type FeaturesSectionProps = {
  openAuthModal: OpenAuthModal;
  t: Translate;
};

const FeaturesSection = ({ openAuthModal, t }: FeaturesSectionProps) => {
  return (
    <section id="travel-guides" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-primary">{t("features.eyebrow")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {t("features.title")}
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              {t("cta.startPlanning")}
              <ArrowRight className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-bold transition hover:bg-muted"
            >
              {t("cta.getApp")}
              <Download className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.titleKey}
                className="rounded-lg border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{t(feature.titleKey)}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {t(feature.descriptionKey)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
