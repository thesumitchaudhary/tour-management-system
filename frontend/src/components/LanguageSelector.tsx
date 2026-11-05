import { Globe2 } from "lucide-react";
import { indianStateLanguages } from "@/i18n/stateLanguages";
import type { useLanguage } from "@/hooks/useLanguage";

type LanguageSelectorProps = ReturnType<typeof useLanguage> & { id: string };

const LanguageSelector = ({ id, handleLanguageChange: onLanguageChange, selectedLanguage, selectedLanguageId, t }: LanguageSelectorProps) => {
  return (
          <div className="mt-5 max-w-sm">
            <label
              htmlFor={id}
              className="mb-2 flex items-center gap-2 text-sm font-medium text-background/80"
            >
              <Globe2 className="size-4" />
              {t("footer.languageLabel")}
            </label>
            <select
              id={id}
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
  );
};

export default LanguageSelector;
