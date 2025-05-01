import { getCSVData, parseCSVData } from "../utils/data.js";

/**
 * Get all venue user data
 *
 * {
 *    "header": ["...", "...", ...],
 *    "data": [
 *      ["...", "...", ...],
 *      ...
 *    ]
 * }
 */
export async function getVenueUserData() {
  return parseCSVData(await getCSVData("./data/venueUser.csv"));
}
