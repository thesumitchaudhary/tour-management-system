import { Star } from "lucide-react";
import { testimonials } from "../data/testmonials.data";
import type { Translate } from "../types/home.types";

type StoriesSectionProps = {
  t: Translate;
};

const StoriesSection = ({ t }: StoriesSectionProps) => {
  return (
    <section id="stories" className="bg-secondary/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{t("stories.title")}</h2>
          <p className="mt-4 text-lg leading-7 text-muted-foreground">
            {t("stories.description")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex gap-1 text-primary" aria-label={t("stories.ratingLabel")}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 leading-7 text-card-foreground">
                "{t(testimonial.quoteKey)}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-md bg-accent font-bold text-accent-foreground">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
