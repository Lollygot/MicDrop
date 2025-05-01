import {
  appendCSVData,
  convertCSVDataToWriteableFormat,
  getCSVData,
  parseCSVData,
  writeCSVData,
} from "../utils/data.js";

/**
 * Add a new user
 *
 * type should be "BUSKER" or "VENUE"
 */
export async function addUser(username, password, type) {
  let userData = await getUserData();
  await writeCSVData(
    "./data/user.csv",
    convertCSVDataToWriteableFormat(
      appendCSVData(
        {
          username: username,
          password: password,
          type: type,
        },
        userData
      )
    )
  );
}

/**
 * Get all user data
 *
 * [
 *    {
 *      username: "...",
 *      password: "...",
 *      type: "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 *
 * type can only be "BUSKER" or "VENUE"
 */
export async function getUserData() {
  return parseCSVData(await getCSVData("./data/user.csv"));
}
