import { getUserData } from "./user.js";
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

  let newBuskerUserRow = [];
  buskerUserData.header.forEach((headerValue) => {
    switch (headerValue) {
      case "username": {
        newBuskerUserRow.push(username);
        break;
      }
      case "firstName": {
        newBuskerUserRow.push(firstName);
        break;
      }
      case "lastName": {
        newBuskerUserRow.push(lastName);
        break;
      }
      case "email": {
        newBuskerUserRow.push(email);
        break;
      }
      case "image": {
        newBuskerUserRow.push(image);
        break;
      }
    }
  });

  await writeCSVData(
    "./data/buskerUser.csv",
    convertCSVDataToWriteableFormat(
      appendCSVData(newBuskerUserRow, buskerUserData)
    )
  );

  let userData = await getUserData();

  let newUserRow = [];
  userData.header.forEach((headerValue) => {
    switch (headerValue) {
      case "username": {
        newUserRow.push(username);
        break;
      }
      case "password": {
        newUserRow.push(password);
        break;
      }
      case "type": {
        newUserRow.push("BUSKER");
        break;
      }
    }
  });

  await writeCSVData(
    "./data/user.csv",
    convertCSVDataToWriteableFormat(appendCSVData(newUserRow, userData))
  );
}

/**
 * Get all busker user data
 *
 * {
 *    "header": ["...", "...", ...],
 *    "data": [
 *      ["...", "...", ...],
 *      ...
 *    ]
 * }
 */
export async function getBuskerUserData() {
  return parseCSVData(await getCSVData("./data/buskerUser.csv"));
}
