import LanguageSelector from "@/components/LanguageSelector";
import type { useLanguage } from "@/hooks/useLanguage";

const DashboardFooter = ({
  language,
}: {
  language: ReturnType<typeof useLanguage>;
}) => {
  const { t } = language;

  return (
    <footer className="border-t border-border bg-secondary/50 px-4 py-10 text-sm text-muted-foreground sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4 [&_h4]:mb-3 [&_h4]:font-semibold [&_h4]:text-foreground [&_p]:leading-7">
        <div>
          <h4>Wanderlust</h4>
          <p>{t("footer.description")}</p>
          <LanguageSelector id="dashboard-language" {...language} />
        </div>
        <div>
          <h4>Wanderlust</h4>
          <p>{t("footer.links.hotel")}</p>
          <p>{t("footer.links.blog")}</p>
          <p>{t("footer.links.security")}</p>
          <p>{t("footer.links.terms")}</p>
          <p>{t("dashboard.extension")}</p>
          <p>{t("dashboard.budget")}</p>
          <p>{t("dashboard.embed")}</p>
          <p>{t("dashboard.jobs")}</p>
          <p>{t("footer.links.contact")}</p>
        </div>
        <div>
          <h4>{t("footer.guideTitle")}</h4>
          <p>{t("footer.guides.tripPlanners")}</p>
          <p>{t("footer.guides.explore")}</p>
          <p>{t("footer.guides.roadTrips")}</p>
          <p>{t("footer.guides.categories")}</p>
          <p>{t("footer.guides.searchTerms")}</p>
          <p>{t("footer.guides.weather")}</p>
          <p>{t("footer.guides.questions")}</p>
          <p>{t("footer.guides.itineraries")}</p>
          <p>{t("footer.guides.maps")}</p>
          <p>{t("footer.guides.season")}</p>
          <p>{t("footer.guides.places")}</p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
