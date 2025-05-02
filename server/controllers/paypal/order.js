import { getAccessToken } from "./auth.js";

const BASE_URL = "https://api-m.sandbox.paypal.com";
const CLIENT_ID =
  "AZLiYd_GTMoSgq45by8Z3Z66NrMAE-EfUBtTiwaqBSjRsbTDArpdCb0s_9Yz_xF9g7G0HgV-xFBi9aKI";
const BN_CODE = "MicDrop_PSP_PATH";

/**
 * Captures an order for a merchantId and an orderId
 *
 * Will resolve with nothing if successful and throw an error if not
 */
export async function captureOrder(merchantId, orderId) {
  return getAccessToken()
    .then((accessToken) => {
      return fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "PayPal-Auth-Assertion": generateAuthAssertionValue(merchantId),
          "PayPal-Partner-Assertion-Id": BN_CODE,
        },
      });
    })
    .then(async (response) => {
      if (response.status === 201) {
        return;
      } else {
        throw new Error((await response.json()).message);
      }
    });
}

/**
 * Creates an order for a merchantId of a value amount
 *
 * {
 *    id: "...",
 *    approvalLink: "..."
 * }
 */
export async function createOrder(merchantId, value) {
  return getAccessToken()
    .then((accessToken) => {
      return fetch(`${BASE_URL}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "PayPal-Auth-Assertion": generateAuthAssertionValue(merchantId),
          "PayPal-Partner-Attribution-Id": BN_CODE,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: value,
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: value,
                  },
                },
              },
              items: [
                {
                  name: "Donation",
                  quantity: "1",
                  category: "DONATION",
                  unit_amount: {
                    currency_code: "EUR",
                    value: value,
                  },
                },
              ],
            },
          ],
          payment_source: {
            paypal: {
              experience_context: {
                shipping_preference: "NO_SHIPPING",
              },
            },
          },
        }),
      });
    })
    .then(async (response) => {
      if ([200, 201].includes(response.status)) {
        return response.json();
      } else {
        throw new Error((await response.json()).message);
      }
    })
    .then((data) => {
      let approvalLink;
      data.links.forEach((link) => {
        if (["payer-action", "approve"].includes(link.rel)) {
          approvalLink = link.href;
        }
      });

      return {
        id: data.id,
        approvalLink: approvalLink,
      };
    });
}

function generateAuthAssertionValue(merchantId) {
  const header = btoa(
    JSON.stringify({
      alg: "none",
    })
  )
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const payload = btoa(
    JSON.stringify({
      iss: CLIENT_ID,
      payer_id: merchantId,
    })
  )
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${header}.${payload}.`;
}
