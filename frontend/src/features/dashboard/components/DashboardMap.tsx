import type { Translate } from "@/features/home/types/home.types";

const DashboardMap = ({ t }: { t: Translate }) => {
  return (
        <section>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted shadow-sm sm:aspect-video">
            <iframe
              title={t("dashboard.map")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30774733.70886586!2d60.97315999991782!3d19.68359501212266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1792696721136!5m2!1sen!2sin"
              className="block h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </section>
  );
};

export default DashboardMap;
