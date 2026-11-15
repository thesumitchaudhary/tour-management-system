import { Router } from "express";
import { getNearbyHotels } from "../services/overpass.services.js";
import { sendError, sendSuccess } from "../utils/apiTypes.js";

const router = Router();

router.get("/", async (req, res) => {
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
    console.error("Hotel map request failed", error);
    sendError(res, 502, "Unable to load nearby hotels. Please try again later.");
  }
});

export default router;
