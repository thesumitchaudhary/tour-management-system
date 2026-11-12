import { useLanguage } from "@/hooks/useLanguage";
import DashboardFooter from "@/features/dashboard/components/DashboardFooter";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import hotelHero from "@/assets/HotelLandingPage__hero.jpg";
import { BedDouble, Users } from "lucide-react";
import { useState } from "react";

const Hotel = () => {
  const language = useLanguage();
  const { t } = language;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative isolate flex min-h-[max(620px,100svh)] flex-col bg-slate-900 text-white">
        <img
          src={hotelHero}
          alt=""
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/40 to-black/65" />
        <div className="mx-auto w-full max-w-6xl [&_header]:border-0 [&_header]:bg-transparent [&_header]:text-white [&_header_h1]:text-white [&_header_ul]:text-white [&_header>div:first-of-type]:hidden [&_header>div>button]:border-0 [&_header>div>button]:bg-transparent [&_a[href='/user/hotel']]:rounded-lg [&_a[href='/user/hotel']]:bg-black/25 [&_a[href='/user/hotel']]:px-3 [&_a[href='/user/hotel']]:py-4">
          <DashboardHeader t={t} />
        </div>
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-20 pb-24 text-center sm:px-8 lg:pt-28">
          <h2 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-[46px]">
            Search for hotel and Airbnb stays in one place
          </h2>
          <p className="mx-auto mt-3 max-w-[800px] text-lg leading-relaxed text-white/95 sm:text-2xl">
            Experience a better hotel search that helps you find the perfect
            lodging, with your preferences as the highest priority.
          </p>
          <form
            action="/user/hotel"
            method="get"
            className="mx-auto mt-12 grid w-full max-w-[920px] gap-2 text-left text-slate-700 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.5fr)_auto_auto]"
          >
            <label className="flex min-w-0 flex-col justify-center rounded-lg bg-gray-100 px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-400">
              <span className="text-xs font-bold">Where</span>
              <input
                name="destination"
                required
                placeholder="Search destinations"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </label>
            <fieldset className="min-w-0 rounded-lg bg-gray-100 px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-400">
              <legend className="sr-only">Stay dates</legend>
              <span className="block text-xs font-bold">When</span>
              <div className="flex items-center gap-2">
                <input
                  aria-label="Check-in date"
                  name="checkIn"
                  type="date"
                  required
                  value={checkIn}
                  onChange={(event) => {
                    setCheckIn(event.target.value);
                    if (checkOut <= event.target.value) setCheckOut("");
                  }}
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                />
                <span className="h-3 border-l border-slate-300" />
                <input
                  aria-label="Check-out date"
                  name="checkOut"
                  type="date"
                  required
                  min={checkIn || undefined}
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                />
              </div>
            </fieldset>
            <fieldset className="rounded-lg bg-gray-100 px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-400">
              <legend className="sr-only">Travelers and rooms</legend>
              <span className="block text-xs font-bold">Travelers</span>
              <div className="flex items-center gap-1.5">
                <BedDouble size={16} aria-hidden="true" />
                <input
                  aria-label="Rooms"
                  name="rooms"
                  type="number"
                  min="1"
                  max="20"
                  defaultValue="1"
                  className="w-8 bg-transparent text-sm outline-none"
                />
                <Users size={16} aria-hidden="true" />
                <input
                  aria-label="Guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="40"
                  defaultValue="2"
                  className="w-8 bg-transparent text-sm outline-none"
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="min-h-14 cursor-pointer rounded-full bg-[#ff563f] px-7 text-sm font-bold text-white transition-colors hover:bg-[#e94732] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Search
            </button>
          </form>
          <p className="mt-5 text-sm text-white/90">
            Already booked?{" "}
            <span className="ml-2 font-bold">Manage your bookings</span>
          </p>
        </main>
      </section>

      <section>
        <div>sumit</div>
      </section>
      <DashboardFooter language={language} />
    </div>
  );
};

export default Hotel;
