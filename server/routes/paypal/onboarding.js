import { Router } from "express";

import {
  createPartnerReferral,
  isMerchantOnboardingCompleted,
} from "../../controllers/paypal/onboarding.js";

const router = Router();

/**
 * Get whether onboarding was completed for a tracking ID or not
 *
 * 200 response
 * {
 *    isOnboardingComplete: true
 * }
 */
router.get("/isOnboardingComplete/:trackingId", async (req, res) => {
  isMerchantOnboardingCompleted(req.params.trackingId)
    .then((data) => {
      res.status(200).json({
        isOnboardingComplete: data.isMerchantOnboardingComplete,
        merchantId: data.merchantId,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * Create a new partner referral link
 *
 * 201 response
 * {
 *    link: "..."
 * }
 */
router.post("/new", async (_req, res) => {
  createPartnerReferral()
    .then((data) => {
      res.status(201).json({
        link: data.url,
        trackingId: data.trackingId,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: error.message });
    });
});

export default router;
