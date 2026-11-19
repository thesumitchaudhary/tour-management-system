import { Router } from "express";
import { getNearbyHotels, getHotelsInArea, OverpassUnavailableError } from "../services/overpass.services.js";
import { getSearchArea } from "../services/nominatim.service.js";
import { sendError, sendSuccess } from "../utils/apiTypes.js";

const router = Router();

router.get("/", async (req, res) => {
  const { destination, checkIn, checkOut } = req.query;
  if (destination !== undefined) {
    if (typeof destination !== "string" || !destination.trim() || destination.length > 200) {
      sendError(res, 400, "Provide a destination up to 200 characters");
      return;
    }
    const validDate = (value: unknown): value is string =>
      typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
    if ((checkIn !== undefined && !validDate(checkIn)) ||
      (checkOut !== undefined && (!validDate(checkOut) || !validDate(checkIn) || checkOut <= checkIn))) {
      sendError(res, 400, "Provide a valid check-in date and a later check-out date");
      return;
    }
    try {
      const area = await getSearchArea(destination.trim());
      if (!area) {
        sendError(res, 404, "Destination not found in India. Try a city and state.");
        return;
      }
      const hotels = await getHotelsInArea(area);
      sendSuccess(res, 200, "Hotels loaded", {
        destination: area.name, bounds: area.bounds, checkIn: checkIn ?? null, checkOut: checkOut ?? null, hotels,
      });
    } catch (error) {
      if (error instanceof OverpassUnavailableError) {
        res.setHeader("Retry-After", error.retryAfter);
        sendError(res, 503, `${error.message} Try again in ${error.retryAfter} seconds.`);
        return;
      }
      console.error("Hotel destination search failed", error);
      sendError(res, 502, "Unable to load hotels. Please try again later.");
    }
    return;
  }
  const { lat, lon, radius = "5000" } = req.query;

  if (
    typeof lat !== "string" || lat.trim() === "" ||
    typeof lon !== "string" || lon.trim() === "" ||
    typeof radius !== "string" || radius.trim() === ""
  ) {
    sendError(res, 400, "Provide lat, lon, and an optional radius in meters");
    return;
  }

  const latitude = Number(lat);
  const longitude = Number(lon);
  const searchRadius = Number(radius);

  if (
    !Number.isFinite(latitude) || Math.abs(latitude) > 90 ||
    !Number.isFinite(longitude) || Math.abs(longitude) > 180 ||
    !Number.isFinite(searchRadius) || searchRadius <= 0 || searchRadius > 10_000
  ) {
    sendError(res, 400, "Use valid coordinates and a radius greater than 0 and up to 10000 meters");
    return;
  }

  try {
    const hotels = await getNearbyHotels(latitude, longitude, searchRadius);
    sendSuccess(res, 200, "Nearby hotels loaded", hotels);
  } catch (error) {
    if (error instanceof OverpassUnavailableError) {
      res.setHeader("Retry-After", error.retryAfter);
      sendError(res, 503, `${error.message} Try again in ${error.retryAfter} seconds.`);
      return;
    }
    console.error("Hotel map request failed", error);
    sendError(res, 502, "Unable to load nearby hotels. Please try again later.");
  }
});

export default router;
