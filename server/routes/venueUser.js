import { Router } from "express";

import { getVenueUserData } from "../controllers/venueUser.js";

const router = Router();

/**
 * Get all venue user data
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
  getVenueUserData().then((data) => {
    res.status(200).json(data);
  });
});

export default router;
