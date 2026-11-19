import type { SearchArea } from "./nominatim.service.js";
import { setTimeout as delay } from "node:timers/promises";

const hotelCache = new Map<string, { hotels: MapHotel[]; expires: number }>();
const pendingQueries = new Map<string, Promise<MapHotel[]>>();
let unavailableUntil = 0;

export class OverpassUnavailableError extends Error {
  constructor(public readonly retryAfter: number, options?: ErrorOptions) {
    super("Hotel search is temporarily busy. Please try again shortly.", options);
    this.name = "OverpassUnavailableError";
  }
}

export type MapHotel = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  listedCharge: string | null;
  website: string | null;
};

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

export async function getNearbyHotels(
  latitude: number,
  longitude: number,
  radius: number,
): Promise<MapHotel[]> {
  return queryHotels(`nwr["tourism"="hotel"](around:${radius},${latitude},${longitude});`);
}

export const getNearbyArea = getNearbyHotels;

export async function getHotelsInArea(area: SearchArea): Promise<MapHotel[]> {
  const [south, north, west, east] = area.bounds;
  const selector = area.osmType === "relation"
    ? `area(${3_600_000_000 + area.osmId})->.searchArea;
       nwr["tourism"="hotel"](area.searchArea);`
    : `nwr["tourism"="hotel"](${south},${west},${north},${east});`;
  return queryHotels(selector);
}

function queryHotels(selector: string): Promise<MapHotel[]> {
  const cached = hotelCache.get(selector);
  if (cached && cached.expires > Date.now()) return Promise.resolve(cached.hotels);
  const pending = pendingQueries.get(selector);
  if (pending) return pending;
  if (unavailableUntil > Date.now()) {
    return Promise.reject(new OverpassUnavailableError(Math.ceil((unavailableUntil - Date.now()) / 1000)));
  }
  const request = loadHotels(selector).then((hotels) => {
    if (hotelCache.size >= 200) hotelCache.delete(hotelCache.keys().next().value!);
    hotelCache.set(selector, { hotels, expires: Date.now() + 10 * 60_000 });
    return hotels;
  }).finally(() => pendingQueries.delete(selector));
  pendingQueries.set(selector, request);
  return request;
}

async function fetchOverpass(query: string): Promise<Response> {
  for (let attempt = 0; attempt < 3; attempt++) {
    let retryDelay = 2000 * 2 ** attempt;
    let failure: unknown;
    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "User-Agent": "TourManagementSystem/1.0 (hotel destination search)",
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({ data: query }),
        signal: AbortSignal.timeout(70_000),
      });
      if (response.ok) return response;
      const details = (await response.text()).replace(/\s+/g, " ").slice(0, 500);
      const error = new Error(`Overpass error: ${response.status} ${response.statusText}. ${details}`);
      if (![429, 502, 503, 504].includes(response.status)) throw error;

      const retryAfter = response.headers.get("Retry-After");
      const waitSeconds = retryAfter === null ? 0 : Number(retryAfter);
      const retryAfterMs = Number.isFinite(waitSeconds)
        ? waitSeconds * 1000
        : Date.parse(retryAfter!) - Date.now();
      retryDelay = Math.max(retryDelay, response.status === 429 ? 30_000 : 0, retryAfterMs || 0);
      failure = error;
    } catch (error) {
      if (!(error instanceof TypeError) &&
        !(error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name))) throw error;
      failure = error;
    }

    // Long server-requested waits are returned to the caller instead of holding the request open.
    if (attempt === 2 || retryDelay > 30_000) {
      const retryAfter = Math.ceil(Math.max(30_000, retryDelay) / 1000);
      unavailableUntil = Math.max(unavailableUntil, Date.now() + retryAfter * 1000);
      throw new OverpassUnavailableError(retryAfter, { cause: failure });
    }
    await delay(retryDelay);
  }
  throw new OverpassUnavailableError(30);
}

async function loadHotels(selector: string): Promise<MapHotel[]> {
  const overpassQuery = `[out:json][timeout:60]; ${selector} out center tags;`;

  const response = await fetchOverpass(overpassQuery);

  const result: { elements?: OverpassElement[]; remark?: string } =
    await response.json();

  if (result.remark || !Array.isArray(result.elements)) {
    throw new Error("Overpass returned an incomplete response");
  }

  return result.elements.flatMap((element) => {
    const lat = element.lat ?? element.center?.lat;
    const lon = element.lon ?? element.center?.lon;

    if (
      typeof lat !== "number" || typeof lon !== "number" ||
      !Number.isFinite(lat) || !Number.isFinite(lon) ||
      Math.abs(lat) > 90 || Math.abs(lon) > 180
    ) {
      return [];
    }

    return [{
      id: `${element.type}/${element.id}`,
      name: element.tags?.name || "Unnamed hotel",
      latitude: lat,
      longitude: lon,
      listedCharge: element.tags?.charge || null,
      website: /^https?:\/\//i.test(element.tags?.website ?? element.tags?.["contact:website"] ?? "")
        ? (element.tags?.website || element.tags?.["contact:website"] || null)
        : null,
    }];
  });
}
