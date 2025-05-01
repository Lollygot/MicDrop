import { addUser } from "./user.js";
import {
  appendCSVData,
  convertCSVDataToWriteableFormat,
  getCSVData,
  parseCSVData,
  writeCSVData,
} from "../utils/data.js";

/**
 * Add a new user as a busker
 *
 * image should be a URL to the profile image
 * If no profile image, leave as an empty string
 */
export async function addBuskerUser(
  username,
  password,
  firstName,
  lastName,
  email,
  image
) {
  let buskerUserData = await getBuskerUserData();
  await writeCSVData(
    "./data/buskerUser.csv",
    convertCSVDataToWriteableFormat(
      appendCSVData(
        {
          username: username,
          firstName: firstName,
          lastName: lastName,
          email: email,
          image: image,
        },
        buskerUserData
      )
    )
  );

  await addUser(username, password, "BUSKER");
}

/**
 * Get all busker user data
 *
 * [
 *    {
 *      "username": "...",
 *      "firstName": "...",
 *      "lastName": "...",
 *      "email": "...",
 *      "image": "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 *
 * image may be an empty string
 */
export async function getBuskerUserData() {
  return parseCSVData(await getCSVData("./data/buskerUser.csv"));
}
