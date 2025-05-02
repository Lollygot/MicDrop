import { Router } from "express";

import { captureOrder, createOrder } from "../../controllers/paypal/order.js";

const router = Router();

/**
 * Capture an order with a merchantId and orderId
 *
 * Params:
 *
 * merchantId
 * orderId
 *
 * 204 response
 */
router.post("/capture", async (req, res) => {
  captureOrder(req.body.merchantId, req.body.orderId)
    .then(() => {
      res.status(204).json({});
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * Create an order with a merchantId and order value
 *
 * Params:
 *
 * merchantId
 * value
 *
 * 201 response
 * {
 *    id: "..."
 * }
 */
router.post("/new", async (req, res) => {
  createOrder(req.body.merchantId, req.body.value)
    .then((orderId) => {
      res.status(201).json({
        id: orderId,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: error.message });
    });
});

export default router;
