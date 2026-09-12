import { stats } from "../data/stats.data";
import type { Translate } from "../types/home.types";

type StatsSectionProps = {
  t: Translate;
};

const StatsSection = ({ t }: StatsSectionProps) => {
  return (
    <div className="grid gap-3 self-end sm:grid-cols-3 lg:grid-cols-1">
      {stats.map((stat) => (
        <div
          key={stat.labelKey}
          className="rounded-lg border border-white/20 bg-white/12 p-4 backdrop-blur"
        >
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="mt-1 text-sm leading-5 text-white/75">{t(stat.labelKey)}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
