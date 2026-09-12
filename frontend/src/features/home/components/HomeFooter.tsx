import { Globe2 } from "lucide-react";
import { indianStateLanguages } from "@/i18n/stateLanguages";
import { footerLinks } from "../data/footer.data";
import { guideLinks } from "../data/guide.data";
import type { ChangeEvent } from "react";
import type { Translate } from "../types/home.types";

type HomeFooterProps = {
  onLanguageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedLanguage: (typeof indianStateLanguages)[number];
  selectedLanguageId: string;
  t: Translate;
};

const HomeFooter = ({
  onLanguageChange,
  selectedLanguage,
  selectedLanguageId,
  t,
}: HomeFooterProps) => {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_0.7fr_1.4fr] lg:px-8">
        <section>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Globe2 className="size-5" />
            </span>
            <h2 className="text-xl font-bold">Wanderlust</h2>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-background/70">
            {t("footer.description")}
          </p>
          <div className="mt-5 max-w-sm">
            <label
              htmlFor="footer-language"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-background/80"
            >
              <Globe2 className="size-4" />
              {t("footer.languageLabel")}
            </label>
            <select
              id="footer-language"
              value={selectedLanguageId}
              onChange={onLanguageChange}
              className="w-full rounded-md border border-background/20 bg-background px-3 py-2 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
            >
              {indianStateLanguages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.region} - {language.nativeName} ({language.language})
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-5 text-background/60">
              {t("footer.activeLabel")}: {selectedLanguage.region} -{" "}
              {selectedLanguage.nativeName}
            </p>
          </div>
        </section>

        <section>
          <h3 className="font-semibold">{t("footer.companyTitle")}</h3>
          <div className="mt-4 grid gap-3 text-sm text-background/70">
            {footerLinks.map((link) => (
              <a key={link} href="#home" className="transition hover:text-background">
                {t(link)}
              </a>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-semibold">{t("footer.guideTitle")}</h3>
          <div className="mt-4 grid gap-x-5 gap-y-3 text-sm text-background/70 sm:grid-cols-2">
            {guideLinks.map((link) => (
              <a key={link} href="#home" className="transition hover:text-background">
                {t(link)}
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default HomeFooter;
