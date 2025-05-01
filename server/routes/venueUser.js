import { Router } from "express";

import { addVenueUser, getVenueUserData } from "../controllers/venueUser.js";

const router = Router();

/**
 * Get all venue user data
 *
 * [
 *    {
 *      username: "...",
 *      name: "...",
 *      streetAddress: "...",
 *      city: "...",
 *      postCode: "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 */
router.get("/", async (_req, res) => {
  getVenueUserData().then((data) => {
    res.status(200).json(data);
  });
});

/**
 * Add a new busker user
 *
 * Params:
 *
 * username
 * password
 * name
 * streetAddress
 * city
 * postCode
 */
router.post("/new", async (req, res) => {
  addVenueUser(
    req.body.username,
    req.body.password,
    req.body.name,
    req.body.streetAddress,
    req.body.city,
    req.body.postCode
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
