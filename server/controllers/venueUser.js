import { addUser } from "./user.js";
import {
  appendCSVData,
  convertCSVDataToWriteableFormat,
  getCSVData,
  parseCSVData,
  writeCSVData,
} from "../utils/data.js";

/**
 * Add a new user as a venue
 */
export async function addVenueUser(
  username,
  password,
  name,
  streetAddress,
  city,
  postCode
) {
  let venueUserData = await getVenueUserData();
  await writeCSVData(
    "./data/venueUser.csv",
    convertCSVDataToWriteableFormat(
      appendCSVData(
        {
          username: username,
          name: name,
          streetAddress: streetAddress,
          city: city,
          postCode: postCode,
        },
        venueUserData
      )
    )
  );

  await addUser(username, password, "VENUE");
}

/**
 * Get all venue user data
 *
 * [
 *    {
 *      username: "...",
 *      name: "...",
 *      streetAddress: "...",
 *      city: "...",
 *      postCode: "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 */
export async function getVenueUserData() {
  return parseCSVData(await getCSVData("./data/venueUser.csv"));
}
