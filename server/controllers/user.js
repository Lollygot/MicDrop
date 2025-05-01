import { getCSVData, parseCSVData } from "../utils/data.js";

/**
 * Get all user data
 *
 * {
 *    "header": ["...", "...", ...],
 *    "data": [
 *      ["...", "...", ...],
 *      ...
 *    ]
 * }
 */
export async function getUserData() {
  return parseCSVData(await getCSVData("./data/user.csv"));
}
