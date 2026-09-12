import { ArrowRight, Globe2, Moon, Search, Sun } from "lucide-react";
import { navItems } from "../data/nav.data";
import type { OpenAuthModal, Translate } from "../types/home.types";

type HomeNavbarProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  openAuthModal: OpenAuthModal;
  t: Translate;
};

const HomeNavbar = ({ isDarkMode, onToggleTheme, openAuthModal, t }: HomeNavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2" aria-label="Wanderlust home">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Globe2 className="size-5" />
          </span>
          <span className="text-xl font-bold">Wanderlust</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/75 lg:flex">
          {navItems.map((item) => (
            <a key={item.labelKey} href={item.href} className="transition hover:text-foreground">
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        <div className="hidden min-w-64 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground md:flex">
          <Search className="size-4" />
          <input
            type="search"
            placeholder={t("header.searchPlaceholder")}
            className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            aria-pressed={isDarkMode}
            onClick={onToggleTheme}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:bg-muted"
          >
            {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => openAuthModal("signin")}
            className="hidden rounded-md px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted sm:inline-flex"
          >
            {t("header.login")}
          </button>
          <button
            type="button"
            onClick={() => openAuthModal("signup")}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            {t("header.getStarted")}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomeNavbar;
