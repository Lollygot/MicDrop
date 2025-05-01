import { Router } from "express";

import { getBuskData } from "../controllers/busk.js";

const router = Router();

/**
 * Get all busk data
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
  getBuskData().then((data) => {
    res.status(200).json(data);
  });
});

export default router;
