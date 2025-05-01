import express from "express";
import fs from "node:fs";
import { parse } from "csv-parse";
import { finished } from "stream/promises";

const PORT = 8888;

async function readData() {
  const records = [];
  const parser = fs.createReadStream("../data/artist.csv").pipe(parse({}));
  parser.on("readable", () => {
    let record;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });

  await finished(parser);
  return records;
}

const app = express();
app.listen(PORT, () => {
  let data = readData();
  console.log("Server started successfully");
  console.log(data);
});
