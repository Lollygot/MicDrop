import { getCSVData, parseCSVData } from "../utils/data.js";

/**
 * Get all busk data
 *
 * {
 *    "header": ["...", "...", ...],
 *    "data": [
 *      ["...", "...", ...],
 *      ...
 *    ]
 * }
 */
export async function getBuskData() {
  return parseCSVData(await getCSVData("./data/busk.csv"));
}
