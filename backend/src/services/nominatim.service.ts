
type NominatimResult = {
  osm_type?: string;
  osm_id?: number | string;
  category?: string;
  type?: string;
  display_name?: string;
  lat?: string;
  lon?: string;
  address?: {
    city?: string;
    town?: string;
    municipality?: string;
    state?: string;
    country?: string;
  };
};

export type LocationResult = {
  areaId: number;
  osmId: number;
  name: string;
  latitude: number;
  longitude: number;
  displayName: string;
};

export async function getLocationArea(
  destination: string
): Promise<LocationResult> {

  if (!destination.trim()) {
    throw new Error("Destination is required");
  }

  const url = new URL(
    "https://nominatim.openstreetmap.org/search"
  );

  url.searchParams.set("q", `${destination}, India`);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "10");

  const response = await fetch(url, {
    headers: {
      "User-Agent": "WanderlustTourManagement/1.0 (your-contact-email)"
    },
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) {
    throw new Error(
      `Nominatim error: ${response.status}`
    );
  }

  const results: NominatimResult[] =
    await response.json();

  if (!results.length) {
    throw new Error("Location not found");
  }

  // Find an administrative boundary relation
  const location = results.find(
    (item) =>
      item.category === "boundary" &&
      item.type === "administrative" &&
      item.osm_type === "relation"
  );

  if (!location || !location.osm_id) {
    throw new Error(
      "Administrative boundary relation not found"
    );
  }

  const osmId = Number(location.osm_id);

  if (!Number.isSafeInteger(osmId) || osmId <= 0) {
    throw new Error("Invalid OSM relation ID");
  }

  // Convert OSM relation ID into Overpass area ID
  const areaId = osmId + 3600000000;

  return {
    areaId,
    osmId,
    name:
      location.address?.city ||
      location.address?.town ||
      location.address?.municipality ||
      destination,
    latitude: Number(location.lat),
    longitude: Number(location.lon),
    displayName: location.display_name || destination
  };
}
export type SearchArea = {
  name: string;
  osmType: "node" | "way" | "relation";
  osmId: number;
  bounds: [number, number, number, number];
};

const cache = new Map<string, { area: SearchArea; expires: number }>();
let pending: Promise<unknown> = Promise.resolve();
let lastRequest = 0;

export function getSearchArea(destination: string): Promise<SearchArea | null> {
  // Serialize public Nominatim requests and reuse recent destination lookups.
  const lookup = pending.then(async () => {
    const normalizedDestination = destination.trim().replace(/\bahemdabad\b/gi, "Ahmedabad");
    const key = normalizedDestination.toLowerCase();
    const cached = cache.get(key);
    if (cached && cached.expires > Date.now()) return cached.area;

    await new Promise((resolve) => setTimeout(resolve, Math.max(0, 1100 - (Date.now() - lastRequest))));
    lastRequest = Date.now();
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.search = new URLSearchParams({
      q: normalizedDestination, countrycodes: "in", format: "jsonv2", limit: "10",
      featureType: "city", addressdetails: "1",
    }).toString();
    const response = await fetch(url, {
      headers: { "User-Agent": "TourManagementSystem/1.0", "Accept-Language": "en" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`Nominatim error: ${response.status}`);
    const results = await response.json() as Array<{
      display_name: string;
      osm_type: SearchArea["osmType"];
      osm_id: number;
      boundingbox: string[];
      addresstype?: string;
      category?: string;
      type?: string;
    }>;
    if (!Array.isArray(results)) throw new Error("Invalid Nominatim response");
    // Prefer a city boundary so a similarly named point cannot shrink the hotel search.
    const result = results.find((item) => item.osm_type === "relation" &&
      ["city", "town", "municipality"].includes(item.addresstype ?? "")) ??
      results.find((item) => item.osm_type === "relation" &&
        item.category === "boundary" && item.type === "administrative") ?? results[0];
    if (!result) return null;
    const bounds = result.boundingbox?.map(Number);
    if (!bounds || bounds.length !== 4 || !bounds.every(Number.isFinite) ||
      !["node", "way", "relation"].includes(result.osm_type) ||
      !Number.isSafeInteger(result.osm_id) || result.osm_id <= 0 ||
      Math.abs(bounds[0]!) > 90 || Math.abs(bounds[1]!) > 90 ||
      Math.abs(bounds[2]!) > 180 || Math.abs(bounds[3]!) > 180 ||
      bounds[0]! > bounds[1]! || bounds[2]! > bounds[3]!) {
      throw new Error("Invalid Nominatim location");
    }
    const area: SearchArea = {
      name: result.display_name,
      osmType: result.osm_type,
      osmId: result.osm_id,
      bounds: bounds as SearchArea["bounds"],
    };
    if (cache.size >= 200) cache.delete(cache.keys().next().value!);
    cache.set(key, { area, expires: Date.now() + 86_400_000 });
    return area;
  });
  pending = lookup.catch(() => undefined);
  return lookup;
}
