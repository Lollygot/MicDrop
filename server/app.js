import express from "express";

import buskRouter from "./routes/busk.js";
import buskerUserRouter from "./routes/buskerUser.js";
import eventRouter from "./routes/event.js";
import userRouter from "./routes/user.js";
import venueUserRouter from "./routes/venueUser.js";

const PORT = 8888;

const app = express();

app.use(express.json());

app.use("/busk", buskRouter);
app.use("/buskerUser", buskerUserRouter);
app.use("/event", eventRouter);
app.use("/user", userRouter);
app.use("/venueUser", venueUserRouter);

app.listen(PORT, async () => {
  console.log("Server started successfully");
});
