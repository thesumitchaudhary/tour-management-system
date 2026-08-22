import { useState } from "react";
import ReactPlayer from "react-player";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Sun, Moon } from "lucide-react";
import AuthModal, { type AuthMode } from "@/page/homePages/AuthModal";

const Dashbord = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [theme, setTheme] = useState(true);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const changeTheme = () => {
    setTheme(!theme);
  };

  return (
    <div
      className={`${theme == false ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="mx-5">
        <header className="flex justify-between">
          <div className="flex gap-4">
            <h1>Wanderlust</h1>
            <nav>
              <ul className="flex gap-3">
                <li>Destinations</li>
                <li>Why Us</li>
                <li>Stories</li>
              </ul>
            </nav>
          </div>
          <div className="flex gap-5">
            {theme == false ? (
              <button onClick={changeTheme}>
                <Sun />
              </button>
            ) : (
              <button onClick={changeTheme}>
                <Moon />
              </button>
            )}

            <button type="button" onClick={() => openAuthModal("signin")}>
              Login
            </button>
            <button type="button" onClick={() => openAuthModal("signup")}>
              Get Started
            </button>
          </div>
        </header>
        <main>
          <section>
            <div>
              <h2>One app for all your travel planning needs</h2>
              <p>
                Create detailed itineraries, explore user-shared guides, and
                manage your bookings seamlessly — all in one place.
              </p>
            </div>
            <div>
              <button>start planning</button>
              <button>Get the app</button>
            </div>
          </section>
          <section>
            <div
              style={{
                width: "560px",
                height: "640px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ReactPlayer
                src={"https://www.youtube.com/shorts/XJeOMVJr1Cc"}
                controls={true}
                width="100%"
                height="100%"
              />
            </div>
            <p>Your itinerary and your map in one view</p>
            <p>
              No more switching between different apps, tabs, and tools to keep
              track of your travel plans.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-2xl flex justify-around">
              What travelers are raving about Over 1 million people have already
            </h2>
            <p className="text-xl flex justify-around">
              tried Wanderlust and loved its easy trip planning features.
            </p>
          </section>
          <section>
            <div>
              <img src="" alt="logo" />
              <p>travel blogger</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                beatae tempora dolorum ab iusto asperiores ratione cum expedita
                aspernatur voluptates ullam minus, mollitia quidem est
                repudiandae. Perferendis, iure rerum? Veniam.
              </p>
            </div>
            <div>
              <img src="" alt="logo" />
              <p>travel blogger</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                beatae tempora dolorum ab iusto asperiores ratione cum expedita
                aspernatur voluptates ullam minus, mollitia quidem est
                repudiandae. Perferendis, iure rerum? Veniam.
              </p>
            </div>
            <div>
              <img src="" alt="logo" />
              <p>travel blogger</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                beatae tempora dolorum ab iusto asperiores ratione cum expedita
                aspernatur voluptates ullam minus, mollitia quidem est
                repudiandae. Perferendis, iure rerum? Veniam.
              </p>
            </div>
            <div>
              <img src="" alt="logo" />
              <p>travel blogger</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                beatae tempora dolorum ab iusto asperiores ratione cum expedita
                aspernatur voluptates ullam minus, mollitia quidem est
                repudiandae. Perferendis, iure rerum? Veniam.
              </p>
            </div>
            <div>
              <img src="" alt="logo" />
              <p>travel blogger</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                beatae tempora dolorum ab iusto asperiores ratione cum expedita
                aspernatur voluptates ullam minus, mollitia quidem est
                repudiandae. Perferendis, iure rerum? Veniam.
              </p>
            </div>
          </section>
          <section>
            <h2>Features to replace all your other tools</h2>
            <div>
              <div>
                <img src="" alt="" />
                <h3>Add places from guides with 1 click</h3>
                <p>
                  We crawled the web so you don’t have to. Easily add mentioned
                  places to your plan.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h3>Add places from guides with 1 click</h3>
                <p>
                  We crawled the web so you don’t have to. Easily add mentioned
                  places to your plan.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h3>Add places from guides with 1 click</h3>
                <p>
                  We crawled the web so you don’t have to. Easily add mentioned
                  places to your plan.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h3>Add places from guides with 1 click</h3>
                <p>
                  We crawled the web so you don’t have to. Easily add mentioned
                  places to your plan.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h3>Add places from guides with 1 click</h3>
                <p>
                  We crawled the web so you don’t have to. Easily add mentioned
                  places to your plan.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h3>Add places from guides with 1 click</h3>
                <p>
                  We crawled the web so you don’t have to. Easily add mentioned
                  places to your plan.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h3>Add places from guides with 1 click</h3>
                <p>
                  We crawled the web so you don’t have to. Easily add mentioned
                  places to your plan.
                </p>
              </div>

              <button>Start planning</button>
              <button>Get App</button>
            </div>
          </section>
          <section>
            <h3>Recommanded by the press</h3>
            <p>Discover why we're their top choice for travel planning.</p>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          <section>
            <div>
              <h2>Maximize your trip planning with Pro</h2>
              <p>
                Experience the full potential of Wanderlust with a Pro
                subscription. Enjoy enhanced features and streamlined planning.
              </p>
            </div>
            <div>
              <div>
                <img src="" alt="" />
                <h4>live flight updates</h4>
                <p>
                  Get notified and monitor your flight status to ensure a smooth
                  travel experience.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h4>Offline access</h4>
                <p>
                  No wifi, no problem. Your trip plans are locally downloaded
                  for access anywhere.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h4>Automatic Gmail scanning</h4>
                <p>
                  Get your travel reservations automatically synced into your
                  trip plan
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h4>Optimize your route</h4>
                <p>
                  Perfect for road trips and saving $$$ on gas! Get the best
                  route auto-rearranged.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h4>Flight deals</h4>
                <p>
                  Cheap flight deals sent straight to your inbox so you can plan
                  your next best trip.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h4>Unlimited attachments</h4>
                <p>
                  Never dig through your emails again — access all your trip
                  files and PDFs in one place.
                </p>
              </div>
              <div>
                <img src="" alt="" />
                <h4>Export to Google Maps</h4>
                <p>
                  Get your places exported to Google Maps. Auto-updated when
                  your plans change.
                </p>
              </div>
            </div>
          </section>
          <section>
            <div>
              <div>
                <h4> Top 10 cities</h4>
                <p>jaipur</p>
                <p>udaipur</p>
                <p>surat</p>
                <p>mumbai</p>
                <p>nasik</p>
                <p>bangluru</p>
                <p>noida</p>
                <p>gandhinagar</p>
                <p>indor</p>
                <p>amritsar</p>
                <p>chandigrah</p>
              </div>
              <div>
                <h4>Top 10 parks & nature</h4>
                <p>sumit</p>
                <p>sumit</p>
                <p>sumit</p>
                <p>sumit</p>
                <p>sumit</p>
                <p>sumit</p>
              </div>
              <div>
                <h4> Top 10 attractions</h4>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </div>
            </div>
          </section>
        </main>
        <footer>
          <div>
            <section>
              <p>change language</p>
              <p>Made with sumit 2026 travel inc.</p>
            </section>
            <section>
              <h3>Wanderlust</h3>
              <p>hotel</p>
              <p>blog</p>
              <p>report security issue</p>
              <p>terms, privacy policy & copyright</p>
              <p>contact us</p>
            </section>
            <section>
              <h3>Guide and resources</h3>
              <p>Trip planners by destination</p>
              <p>Explore cities and countries</p>
              <p>Road trips by destination</p>
              <p>Best places to visit by category</p>
              <p>Popular search terms by destination</p>
              <p>Weather around the world</p>
              <p>Travel questions & answers</p>
              <p>Travel itinerary guides</p>
              <p>Maps of cities and national parks</p>
              <p>Destinations at different times of the year</p>
              <p>Places to visit by destination</p>
            </section>
          </div>
        </footer>
        {isAuthOpen ? (
          <AuthModal
            defaultMode={authMode}
            onClose={() => setIsAuthOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Dashbord;
