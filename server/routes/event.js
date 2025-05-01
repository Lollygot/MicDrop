import { Router } from "express";

import { getEventData } from "../controllers/event.js";

const router = Router();

/**
 * Get all event data
 *
 * {
 *    "header": ["...", "...", ...],
 *    "data": [
 *      ["...", "...", ...],
 *      ...
 *    ]
 * }
 */
router.get("/", async (_req, res) => {
  getEventData().then((data) => {
    res.status(200).json(data);
  });
});

export default router;
