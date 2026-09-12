import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { pressMentions } from "../data/press.data";
import type { Translate } from "../types/home.types";

type PressSectionProps = {
  t: Translate;
};

const PressSection = ({ t }: PressSectionProps) => {
  return (
    <section className="border-y border-border bg-muted/45 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase text-primary">{t("press.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            {t("press.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("press.description")}</p>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto mt-10 w-full max-w-5xl"
        >
          <CarouselContent>
            {pressMentions.map((mention) => (
              <CarouselItem key={mention.source} className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full p-1">
                  <Card className="h-full rounded-lg">
                    <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
                      <p className="text-lg font-semibold leading-7">{t(mention.titleKey)}</p>
                      <div>
                        <p className="text-sm font-bold text-primary">{mention.source}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{t("press.meta")}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default PressSection;
