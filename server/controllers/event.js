import { getCSVData, parseCSVData } from "../utils/data.js";

/**
 * Get all event data
 *
 * [
 *    {
 *      venueName: "...",
 *      name: "...",
 *      artistName: "...",
 *      date: "YYYY-MM-DD",
 *      time: "HH:MM:SS",
 *      duration: 120,
 *      price: "...",
 *      ticketLink: "...",
 *      eventImage: "...",
 *      artistSpotify: "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 *
 * duration is in minutes
 * ticketLink, eventImage & artistSpotify may be empty strings
 */
export async function getEventData() {
  return parseCSVData(await getCSVData("./data/event.csv"));
}
