import express from "express";

import dataRouter from "./routes/data/router.js";
import payPalRouter from "./routes/paypal/router.js";

const PORT = 8888;

const app = express();

app.use(express.json());

app.use("/data", dataRouter);
app.use("/paypal", payPalRouter);

app.listen(PORT, async () => {
  console.log("Server started successfully");
});
