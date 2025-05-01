import { Router } from "express";

import { addBuskerUser, getBuskerUserData } from "../controllers/buskerUser.js";

const router = Router();

/**
 * Get all busker user data
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
  getBuskerUserData()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: error.message });
    });
});

/**
 * Add a new busker user
 *
 * Params:
 *
 * username
 * password
 * firstName
 * lastName
 * email
 * image
 *
 * image should be a URL to the profile image
 * If no profile image, leave as an empty string
 */
router.post("/new", async (req, res) => {
  addBuskerUser(
    req.body.username,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.image
  )
    .then(() => {
      res.status(201).json({ message: "success" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: error.message });
    });
});

export default router;
