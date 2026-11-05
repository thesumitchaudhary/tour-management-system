import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import type { AuthMode } from "@/features/auth/types/auth.types";

export const useHome = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { handleLanguageChange, selectedLanguage, selectedLanguageId, t } = useLanguage();

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((current) => !current);
  };

  return {
    authMode,
    closeAuthModal,
    handleLanguageChange,
    isAuthOpen,
    isDarkMode,
    openAuthModal,
    selectedLanguage,
    selectedLanguageId,
    t,
    toggleTheme,
  };
};
