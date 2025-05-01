import express from "express";

import dataRouter from "./routes/data/router.js";

const PORT = 8888;

const app = express();

app.use(express.json());

app.use("/data", dataRouter);

app.listen(PORT, async () => {
  console.log("Server started successfully");
});
