import { ArrowRight, Download, Sparkles } from "lucide-react";
import type { OpenAuthModal, Translate } from "../types/home.types";
import StatsSection from "./StatsSection";

type HeroSectionProps = {
  openAuthModal: OpenAuthModal;
  t: Translate;
};

const HeroSection = ({ openAuthModal, t }: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[76svh] items-end overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-24 text-white sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
            <Sparkles className="size-4" />
            {t("hero.kicker")}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:bg-primary/90"
            >
              {t("cta.startPlanning")}
              <ArrowRight className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              {t("cta.getApp")}
              <Download className="size-4" />
            </button>
          </div>
        </div>

        <StatsSection t={t} />
      </div>
    </section>
  );
};

export default HeroSection;
