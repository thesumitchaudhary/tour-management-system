import { useLanguage } from "@/hooks/useLanguage";
import DashboardFooter from "@/features/dashboard/components/DashboardFooter";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";

const Guide = () => {
  const language = useLanguage();
  const { t } = language;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader t={t} />
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <section>
          <h3>Explore travel guides and itineraries</h3>
          <input type="text" placeholder="Search for a destination" />
          <p>Or browse out most popular destinations:</p>
          <div>
            <button>Rajasthan</button>
            <button>Uttar Pradesh</button>
            <button>Gujarat</button>
          </div>
        </section>
        <section>
          <h4>Recent guides</h4>
          <div>
            <img src="" alt="" />
            <p>Japan: Video Game Guide...</p>
          </div>
        </section>
      </main>
      <DashboardFooter language={language} />
    </div>
  );
};

export default Guide;
