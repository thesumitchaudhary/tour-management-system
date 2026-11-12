import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import { Icon } from "leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";

type HotelMapHotel = {
  id: string | number;
  name: string;
  latitude: number;
  longitude: number;
};

type HotelMapProps = {
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

function HotelMap({ hotels = [] }: HotelMapProps) {
  const locatedHotels = hotels.filter((hotel) =>
    Number.isFinite(hotel.latitude) &&
    Number.isFinite(hotel.longitude) &&
    Math.abs(hotel.latitude) <= 90 &&
    Math.abs(hotel.longitude) <= 180
  );

  return (
    <MapContainer
      center={[23.0225, 72.5714]}
      zoom={12}
      className="relative z-0"
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locatedHotels.map((hotel) => (
        <Marker
          key={hotel.id}
          icon={hotelMarkerIcon}
          position={[
            hotel.latitude,
            hotel.longitude
          ]}
        >
          <Popup>
            <strong>{hotel.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default HotelMap;
