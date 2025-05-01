import { Router } from "express";

import buskRouter from "./busk.js";
import buskerUserRouter from "./buskerUser.js";
import eventRouter from "./event.js";
import userRouter from "./user.js";
import venueUserRouter from "./venueUser.js";

const router = Router();

router.use("/busk", buskRouter);
router.use("/buskerUser", buskerUserRouter);
router.use("/event", eventRouter);
router.use("/user", userRouter);
router.use("/venueUser", venueUserRouter);

export default router;
