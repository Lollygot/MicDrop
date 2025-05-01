import { Router } from "express";

import { getEventData } from "../../controllers/data/event.js";

const router = Router();

/**
 * Get all event data
 *
 * [
 *    {
 *      venueName: "...",
 *      name: "...",
 *      artistName: "...",
 *      date: "YYYY-MM-DD",
 *      time: "HH:MM:SS",
 *      duration: 120,
 *      price: "...",
 *      ticketLink: "...",
 *      eventImage: "...",
 *      artistSpotify: "..."
 *    },
 *    {
 *      ...
 *    },
 *    ...
 * ]
 *
 * duration is in minutes
 * ticketLink, eventImage & artistSpotify may be empty strings
 */
router.get("/", async (_req, res) => {
  getEventData().then((data) => {
    res.status(200).json(data);
  });
});

export default router;
