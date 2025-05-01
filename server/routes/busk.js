import { Router } from "express";

import { getBuskData } from "../controllers/busk.js";

const router = Router();

/**
 * Get all busk data
 *
 * [
 *    {
 *      username: "...",
 *      date: "YYYY-MM-DD",
 *      time: "HH:MM:SS",
 *      duation: 120,
 *      streetAddress: "...",
 *      city: "...",
 *      postCode: "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 *
 * duration is in minutes
 */
router.get("/", async (_req, res) => {
  getBuskData().then((data) => {
    res.status(200).json(data);
  });
});

export default router;
