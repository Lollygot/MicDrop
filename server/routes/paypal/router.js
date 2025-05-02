import { Router } from "express";

import onboardingRouter from "./onboarding.js";
import orderRouter from "./order.js";

const router = Router();

router.use("/onboarding", onboardingRouter);
router.use("/order", orderRouter);

export default router;
