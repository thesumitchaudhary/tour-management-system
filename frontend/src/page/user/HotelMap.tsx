import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { Icon } from "leaflet";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import api from "@/lib/api";
import { useLanguage } from "@/hooks/useLanguage";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import DashboardFooter from "@/features/dashboard/components/DashboardFooter";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";

type HotelMapHotel = {
  id: string | number;
  name: string;
  latitude: number;
  longitude: number;
  listedCharge?: string | null;
  website?: string | null;
};

export type HotelResults = {
  destination: string;
  bounds?: [number, number, number, number];
  checkIn: string | null;
  checkOut: string | null;
  hotels: HotelMapHotel[];
};

type HotelMapProps = {
  results?: HotelResults;
  hotels?: HotelMapHotel[];
};

const hotelMarkerIcon = new Icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIconRetinaUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function HotelMapBounds({
  hotels,
  bounds,
}: {
  hotels: HotelMapHotel[];
  bounds?: HotelResults["bounds"];
}) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      const [south, north, west, east] = bounds;
      map.fitBounds(
        [
          [south, west],
          [north, east],
        ],
        { padding: [32, 32] },
      );
    } else if (hotels.length > 0) {
      map.fitBounds(
        hotels.map((hotel) => [hotel.latitude, hotel.longitude]),
        {
          padding: [32, 32],
          maxZoom: 14,
        },
      );
    }
  }, [map, hotels, bounds]);

  return null;
}

function HotelMapView({ hotels = [], results }: HotelMapProps) {
  const locatedHotels = (results?.hotels ?? hotels).filter(
    (hotel) =>
      Number.isFinite(hotel.latitude) &&
      Number.isFinite(hotel.longitude) &&
      Math.abs(hotel.latitude) <= 90 &&
      Math.abs(hotel.longitude) <= 180,
  );

  return (
    <>
      {results && (
        <section
          aria-label="Hotel search results"
          aria-live="polite"
          className="grid min-w-0 items-start gap-8 py-8 lg:grid-cols-2"
        >
          <div className="min-w-0">
            <h2 className="text-2xl font-bold">
              Hotels in {results.destination}
            </h2>
            {results.checkIn && (
              <p className="mt-2">
                Check-in {results.checkIn}
                {results.checkOut ? ` · Check-out ${results.checkOut}` : ""}
              </p>
            )}
            <p className="mt-2 text-sm text-muted-foreground">
              OpenStreetMap hotel listings. Contact the hotel to confirm
              availability and prices for your dates.
            </p>
            {/* <p className="mt-4" role="status">{results.hotels.length ? `${results.hotels.length} mapped hotels found` : "No hotels found in this destination. Try another city or nearby area."}</p> */}
            <ul className="mt-6 grid grid-cols-1 gap-4">
              {results.hotels.map((hotel) => (
                <li key={hotel.id} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="mt-2 text-sm">
                    {hotel.listedCharge
                      ? `Listed charge ${hotel.listedCharge}`
                      : "Price available on request"}
                  </p>
                  {hotel.listedCharge && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Confirm the current room rate for your dates with the
                      hotel.
                    </p>
                  )}
                  {hotel.website && (
                    <a
                      className="mt-3 mr-4 inline-block text-blue-600 underline"
                      href={hotel.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Check hotel prices
                    </a>
                  )}
                  <a
                    className="mt-3 inline-block text-blue-600 underline"
                    href={`https://www.openstreetmap.org/${hotel.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on map
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              ©{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                className="underline"
              >
                OpenStreetMap contributors
              </a>
            </p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-xl border lg:sticky lg:top-6">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              className="relative z-0 h-[400px] w-full lg:h-[calc(100dvh-3rem)] lg:min-h-[500px]"
            >
              <HotelMapBounds hotels={locatedHotels} bounds={results?.bounds} />
              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {locatedHotels.map((hotel) => (
                <Marker
                  key={hotel.id}
                  icon={hotelMarkerIcon}
                  position={[hotel.latitude, hotel.longitude]}
                >
                  <Popup>
                    <strong>{hotel.name}</strong>
                    <p>
                      {hotel.listedCharge
                        ? `Listed charge ${hotel.listedCharge}`
                        : "Price available on request"}
                    </p>
                    {hotel.website && (
                      <a href={hotel.website} target="_blank" rel="noreferrer">
                        Check hotel prices
                      </a>
                    )}
                    <p>
                      <a
                        href={`https://www.openstreetmap.org/${hotel.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View on OpenStreetMap
                      </a>
                    </p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </section>
      )}
    </>
  );
}

function HotelMap() {
  const [searchParams] = useSearchParams();
  const language = useLanguage();
  const destination = searchParams.get("destination")?.trim() ?? "";
  const checkIn = searchParams.get("checkIn") || undefined;
  const checkOut = searchParams.get("checkOut") || undefined;
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["hotels", destination, checkIn, checkOut],
    enabled: Boolean(destination),
    retry: false,
    queryFn: async ({ signal }) => {
      const response = await api.get<{ success: true; data: HotelResults }>(
        "/hotels",
        {
          params: { destination, checkIn, checkOut },
          signal,
        },
      );
      return response.data;
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader t={language.t} />
      <main
        aria-busy={isFetching}
        className="mx-auto max-w-6xl px-5 py-8 sm:px-8"
      >
        <Link to="/user/hotel" className="text-blue-600 underline">
          Search another city
        </Link>
        {!destination ? (
          <p role="status" className="mt-6">
            Enter a city on the hotel search page to view its hotels.
          </p>
        ) : isFetching ? (
          <div
            role="status"
            aria-live="polite"
            className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"
          >
            <LoaderCircle
              aria-hidden="true"
              className="size-12 text-[#ff563f] motion-safe:animate-spin"
            />
            <p className="text-lg font-semibold">
              Finding hotels in {destination}
            </p>
            <p className="text-sm text-muted-foreground">
              This may take a minute.
            </p>
          </div>
        ) : error ? (
          <div role="alert" className="mt-6">
            <p>
              {isAxiosError<{ message: string }>(error)
                ? error.response?.data.message ||
                  "Unable to load hotels. Please try again."
                : "Unable to load hotels. Please try again."}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 rounded-lg border px-4 py-2"
            >
              Try again
            </button>
          </div>
        ) : (
          data && <HotelMapView results={data} />
        )}
      </main>
      <DashboardFooter language={language} />
    </div>
  );
}

export default HotelMap;
