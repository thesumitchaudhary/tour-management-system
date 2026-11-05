import { useLanguage } from "@/hooks/useLanguage";
import DashboardFooter from "@/features/dashboard/components/DashboardFooter";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import DashboardMap from "@/features/dashboard/components/DashboardMap";
import RecentTripsSection from "@/features/dashboard/components/RecentTripsSection";
import TripSummarySection from "@/features/dashboard/components/TripSummarySection";
import DestinationCard from "@/features/dashboard/components/DestinationCard";
import pushkarLakeImage from "@/assets/pushakar_lake.jpg";

const UserDashboard = () => {
  const language = useLanguage();
  const { t } = language;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader t={t} />
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <RecentTripsSection t={t} />
        <DashboardMap t={t} />
        <TripSummarySection t={t} />
        <section
          aria-label="Destinations"
          className="grid gap-6 sm:grid-cols-3"
        >
          <DestinationCard
            imageSrc={pushkarLakeImage}
            imageAlt="Pushkar Lake in Rajasthan"
            title="Pushkar Lake"
          />
          <DestinationCard
            imageSrc={pushkarLakeImage}
            imageAlt="Pushkar Lake in Rajasthan"
            title="Pushkar Lake"
          />
          <DestinationCard
            imageSrc={pushkarLakeImage}
            imageAlt="Pushkar Lake in Rajasthan"
            title="Pushkar Lake"
          />
        </section>
      </main>
      <DashboardFooter language={language} />
    </div>
  );
};

export default UserDashboard;
