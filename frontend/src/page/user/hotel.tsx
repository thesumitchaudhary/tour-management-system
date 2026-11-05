import { useLanguage } from "@/hooks/useLanguage";
import DashboardFooter from "@/features/dashboard/components/DashboardFooter";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";

const Hotel = () => {
  const language = useLanguage();
  const { t } = language;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader t={t} />
      <div><img src="../../" alt="" /></div>
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6"></main>
    <DashboardFooter language={language} />
    </div>
  );
};

export default Hotel;
