import { Sparkles } from "lucide-react";
import { proFeatures } from "../data/proFeatures.data";
import type { OpenAuthModal, Translate } from "../types/home.types";

type ProSectionProps = {
  openAuthModal: OpenAuthModal;
  t: Translate;
};

const ProSection = ({ openAuthModal, t }: ProSectionProps) => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">{t("pro.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{t("pro.title")}</h2>
          <p className="mt-4 leading-7 text-muted-foreground">{t("pro.description")}</p>
          <button
            type="button"
            onClick={() => openAuthModal("signup")}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-bold text-background transition hover:bg-foreground/90"
          >
            {t("cta.upgradePlanning")}
            <Sparkles className="size-4" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {proFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.titleKey} className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-bold">{t(feature.titleKey)}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
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

export default ProSection;
