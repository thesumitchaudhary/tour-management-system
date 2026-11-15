export type MapHotel = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: { name?: string };
};

export async function getNearbyHotels(
  latitude: number,
  longitude: number,
  radius: number,
): Promise<MapHotel[]> {
  const overpassQuery = `
    [out:json][timeout:25];
    nwr["tourism"="hotel"](around:${radius},${latitude},${longitude});
    out center;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: new URLSearchParams({ data: overpassQuery }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`Overpass error: ${response.status}`);
  }

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
    }];
  });
}
