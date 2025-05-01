import { getCSVData, parseCSVData } from "../utils/data.js";

/**
 * Get all busk data
 *
 * [
 *    {
 *      username: "...",
 *      date: "YYYY-MM-DD",
 *      time: "HH:MM:SS",
 *      duation: 120,
 *      streetAddress: "...",
 *      city: "...",
 *      postCode: "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 *
 * duration is in minutes
 */
export async function getBuskData() {
  return parseCSVData(await getCSVData("./data/busk.csv"));
}
