import { translations } from "./translation";

const supportedTranslationCodes = new Set(Object.keys(translations));

const translationFallbacks: Record<string, string> = {
  kha: "en",
  kok: "mr",
  ks: "hi",
  lus: "en",
  mni: "hi",
  trp: "bn",
};

export const getTranslationCode = (code: string) => {
  if (supportedTranslationCodes.has(code)) {
    return code;
  }

  return translationFallbacks[code] ?? "en";
};
