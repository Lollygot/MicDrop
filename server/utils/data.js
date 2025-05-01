import { parse } from "csv-parse";
import fs from "node:fs";
import { finished } from "stream/promises";

/**
 * Appends a new row to existing CSV data
 *
 * CSVData should be in the format:
 *
 * [
 *    {
 *      "header1": "value1",
 *      "header2": "value2",
 *      ...
 *    },
 *    ...
 * ]
 *
 * data should be in the format:
 *
 * {
 *    "header1": "value1",
 *    "header2": "value2",
 *    ...
 * }
 */
export function appendCSVData(data, CSVData) {
  return [...CSVData, data];
}

/**
 * Converts CSV data into a writeable format
 *
 * CSVData should be in the format:
 *
 * [
 *    {
 *      "header1": "value1",
 *      "header2": "value2",
 *      ...
 *    },
 *    ...
 * ]
 *
 * Returns:
 *
 * [
 *    "header1,header2,header3,...",
 *    "data1,data2,data3,...",
 *    ...
 * ]
 */
export function convertCSVDataToWriteableFormat(CSVData) {
  let writeableCSVFormat = [];

  let headers = Object.keys(CSVData[0]);
  writeableCSVFormat.push(headers.join(","));

  CSVData.forEach((row) => {
    let newRow = [];
    headers.forEach((header) => {
      newRow.push(row[header]);
    });
    writeableCSVFormat.push(newRow.join(","));
  });

  return writeableCSVFormat;
}

/**
 * Load CSV data from the file path
 *
 * {
 *    "header": ["...", "...", ...],
 *    "data": [
 *      ["...", "...", ...],
 *      ...
 *    ]
 * }
 */
export async function getCSVData(filePath) {
  const parser = fs.createReadStream(filePath).pipe(parse());

  let header = [];
  let data = [];
  let isHeader = true;
  parser.on("readable", () => {
    let record;
    while ((record = parser.read()) !== null) {
      if (isHeader) {
        header = record;
        isHeader = false;
      } else {
        data.push(record);
      }
    }
  });

  await finished(parser);

  return {
    header: header,
    data: data,
  };
}

/**
 * Parse CSV data
 *
 * Input:
 *
 * {
 *    "header": ["...", "...", ...],
 *    "data": [
 *      ["...", "...", ...],
 *      ...
 *    ]
 * }
 *
 * Output:
 *
 * [
 *    {
 *      "header1": "value1",
 *      "header2": "value2",
 *      ...
 *    },
 *    ...
 * ]
 */
export function parseCSVData(CSVData) {
  let transformedData = [];

  CSVData.data.forEach((row) => {
    let dataItem = {};
    row.forEach((item, index) => {
      dataItem[CSVData.header[index]] = item;
    });
    transformedData.push(dataItem);
  });

  return transformedData;
}

/**
 * Write CSV data to the file path
 *
 * CSVData should be in the format:
 *
 * [
 *    "header1,header2,header3,...",
 *    "data1,data2,data3,...",
 *    ...
 * ]
 */
export async function writeCSVData(filePath, CSVData) {
  await fs.promises.writeFile(filePath, CSVData.join("\n"));
}
