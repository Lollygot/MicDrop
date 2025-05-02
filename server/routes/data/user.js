import { Router } from "express";

import { getUserData } from "../../controllers/data/user.js";

const router = Router();

/**
 * Get all user data
 *
 *
 * 200 response
 * [
 *    {
 *      username: "...",
 *      password: "...",
 *      type: "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 *
 * type can only be "BUSKER" or "VENUE"
 */
router.get("/", async (_req, res) => {
  getUserData().then((data) => {
    res.status(200).json(data);
  });
});

export default router;
