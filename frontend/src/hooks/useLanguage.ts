import { useEffect, useState, type ChangeEvent } from "react";
import { getTranslationCode } from "@/i18n/language";
import { indianStateLanguages } from "@/i18n/stateLanguages";
import { translations } from "@/i18n/translation";
import i18n from "@/lib/i18n";

const getInitialLanguageId = () => {
  if (typeof window === "undefined") {
    return indianStateLanguages[0].id;
  }

  const savedLanguageId = window.localStorage.getItem("wanderlust-language");

  return savedLanguageId &&
    indianStateLanguages.some((language) => language.id === savedLanguageId)
    ? savedLanguageId
    : indianStateLanguages[0].id;
};

export const useLanguage = () => {
  const [selectedLanguageId, setSelectedLanguageId] = useState(getInitialLanguageId);

  const selectedLanguage =
    indianStateLanguages.find((language) => language.id === selectedLanguageId) ??
    indianStateLanguages[0];
  const translationCode = getTranslationCode(selectedLanguage.i18nCode);
  const t = (key: string) => translations[translationCode]?.[key] ?? translations.en[key] ?? key;

  useEffect(() => {
    document.documentElement.lang = selectedLanguage.i18nCode;
    window.localStorage.setItem("wanderlust-language", selectedLanguage.id);
    void i18n.changeLanguage(translationCode);
  }, [selectedLanguage, translationCode]);

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguageId(event.target.value);
  };

  return { handleLanguageChange, selectedLanguage, selectedLanguageId, t };
};
