import { useLanguage } from "@/hooks/useLanguage";
import DashboardFooter from "@/features/dashboard/components/DashboardFooter";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import { MapPin, Search } from "lucide-react";
import pushkarLake from "@/assets/pushakar_lake.jpg";
import tajMahal from "@/assets/tajmahal.jpg";
import grinar from "@/assets/girnar-gujarat.jpg";

const Guide = () => {
  const language = useLanguage();
  const { t } = language;
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <DashboardHeader t={t} />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 pt-12 pb-18 max-[540px]:px-4 max-[540px]:pt-6 max-[540px]:pb-10">
        <section
          className="rounded-3xl border border-[#dcebe7] bg-[linear-gradient(135deg,#f0f8f5,#f8faf5)] px-6 py-16 text-center text-[#183d35] max-[540px]:rounded-[18px] max-[540px]:px-[18px] max-[540px]:py-10"
          aria-labelledby="guide-title"
        >
          <h2
            id="guide-title"
            className="mx-auto mb-7 max-w-[650px] text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] font-[750] tracking-[-0.035em]"
          >
            Explore travel guides and itineraries
          </h2>
          <div className="mx-auto flex max-w-[580px] items-center gap-3 rounded-xl border border-[#c8d9d2] bg-white px-[18px] text-[#5c756c] shadow-[0_6px_20px_#183d3508] focus-within:border-[#278366] focus-within:outline-[3px] focus-within:outline-[#27836645]">
            <Search size={21} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search for a destination"
              placeholder="Search for a destination"
              className="w-full min-w-0 bg-transparent py-[17px] text-[#183d35] outline-none placeholder:text-[#687d75]"
            />
          </div>
          <p className="mt-6 mb-3 text-sm text-[#566e64]">
            Or browse our most popular destinations
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 max-[540px]:gap-2">
            {["Rajasthan", "Uttar Pradesh", "Gujarat"].map((destination) => (
              <button
                key={destination}
                type="button"
                className="cursor-pointer rounded-full border border-[#c8d9d2] bg-[#ffffffb3] px-[18px] py-2 text-sm font-medium transition-colors duration-160 hover:border-[#8fb6a4] hover:bg-[#e0efe7] focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[#278366] max-[540px]:px-3"
              >
                {destination}
              </button>
            ))}
          </div>
        </section>
        <section
          className="mt-12 max-[540px]:mt-8"
          aria-labelledby="recent-guides-title"
        >
          <h2
            id="recent-guides-title"
            className="mb-[22px] text-[26px] font-bold tracking-[-0.025em]"
          >
            Recent guides
          </h2>
          <div className="grid grid-cols-3 gap-6 max-[800px]:grid-cols-2 max-[540px]:grid-cols-1">
            <article className="overflow-hidden rounded-2xl border border-[#dce5df] bg-white text-[#183d35]">
              <img
                className="block aspect-[16/10] w-full object-cover"
                src={pushkarLake}
                alt="Pushkar Lake in Rajasthan"
              />
              <div className="p-5">
                <p className="mb-2.5 flex items-center gap-[5px] text-[13px] text-[#60756a]">
                  <MapPin size={15} aria-hidden="true" /> Rajasthan, India
                </p>
                <h3 className="text-[19px] leading-[1.4] font-[650]">
                  Explore Pushkar and its lakeside charm
                </h3>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl border border-[#dce5df] bg-white text-[#183d35]">
              <img
                className="block aspect-[16/10] w-full object-cover"
                src={grinar}
                alt="Pushkar Lake in Rajasthan"
              />
              <div className="p-5">
                <p className="mb-2.5 flex items-center gap-[5px] text-[13px] text-[#60756a]">
                  <MapPin size={15} aria-hidden="true" /> Guajarat, India
                </p>
                <h3 className="text-[19px] leading-[1.4] font-[650]">
                  Explore Pushkar and its lakeside charm
                </h3>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl border border-[#dce5df] bg-white text-[#183d35]">
              <img
                className="block aspect-[16/10] w-full object-cover"
                src={tajMahal}
                alt="Pushkar Lake in Rajasthan"
              />
              <div className="p-5">
                <p className="mb-2.5 flex items-center gap-[5px] text-[13px] text-[#60756a]">
                  <MapPin size={15} aria-hidden="true" /> Rajasthan, India
                </p>
                <h3 className="text-[19px] leading-[1.4] font-[650]">
                  Explore Pushkar and its lakeside charm
                </h3>
              </div>
            </article>
          </div>
        </section>
      </main>
      <DashboardFooter language={language} />
    </div>
  );
};

export default Guide;
