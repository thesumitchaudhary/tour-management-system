import AuthModal from "@/features/auth/components/AuthModal";
import DestinationSection from "../components/DestinationSection";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import HomeFooter from "../components/HomeFooter";
import HomeNavbar from "../components/HomeNavbar";
import MapPlanningSection from "../components/MapPlanningSection";
import PressSection from "../components/PressSection";
import ProSection from "../components/ProSection";
import StoriesSection from "../components/StoriesSection";
import { useHome } from "../hooks/useHome";

const HomePage = () => {
  const {
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
  } = useHome();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <HomeNavbar
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          openAuthModal={openAuthModal}
          t={t}
        />

        <main>
          <HeroSection openAuthModal={openAuthModal} t={t} />
          <MapPlanningSection t={t} />
          <StoriesSection t={t} />
          <FeaturesSection openAuthModal={openAuthModal} t={t} />
          <PressSection t={t} />
          <ProSection openAuthModal={openAuthModal} t={t} />
          <DestinationSection t={t} />
        </main>

        <HomeFooter
          onLanguageChange={handleLanguageChange}
          selectedLanguage={selectedLanguage}
          selectedLanguageId={selectedLanguageId}
          t={t}
        />

        {isAuthOpen ? <AuthModal defaultMode={authMode} onClose={closeAuthModal} /> : null}
      </div>
    </div>
  );
};

export default HomePage;
