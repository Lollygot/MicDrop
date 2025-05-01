import { getCSVData, parseCSVData } from "../utils/data.js";

/**
 * Get all event data
 *
 * {
 *    "header": ["...", "...", ...],
 *    "data": [
 *      ["...", "...", ...],
 *      ...
 *    ]
 * }
 */
export async function getEventData() {
  return parseCSVData(await getCSVData("./data/event.csv"));
}
