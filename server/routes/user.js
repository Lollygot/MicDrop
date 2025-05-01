import { Router } from "express";

import { getUserData } from "../controllers/user.js";

const router = Router();

/**
 * Get all user data
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
  getUserData().then((data) => {
    res.status(200).json(data);
  });
});

export default router;
