import { getAccessToken } from "./auth.js";

const BASE_URL = "https://api-m.sandbox.paypal.com";
const PARTNER_ID = "QYK9RNKKZ8D6C";

/**
 * Get a partner referral URL
 *
 * {
 *    url: "...",
 *    trackingId: "..."
 * }
 */
export async function createPartnerReferral() {
  return getAccessToken()
    .then((accessToken) => {
      const trackingId = crypto.randomUUID();

      return Promise.all([
        fetch(`${BASE_URL}/v2/customer/partner-referrals`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: ["PPCP"],
            legal_consents: [
              {
                type: "SHARE_DATA_CONSENT",
                granted: true,
              },
            ],
            tracking_id: trackingId,
            operations: [
              {
                operation: "API_INTEGRATION",
                api_integration_preference: {
                  rest_api_integration: {
                    integration_method: "PAYPAL",
                    integration_type: "THIRD_PARTY",
                    third_party_details: {
                      features: [
                        "PAYMENT",
                        "PARTNER_FEE",
                        "ACCESS_MERCHANT_INFORMATION",
                        "DISPUTE_READ_BUYER",
                      ],
                    },
                  },
                },
              },
            ],
          }),
        }),
        trackingId,
      ]);
    })
    .then(async ([response, trackingId]) => {
      if (response.status === 201) {
        return Promise.all([response.json(), trackingId]);
      } else {
        throw new Error((await response.json()).message);
      }
    })
    .then(([data, trackingId]) => {
      return [data.links, trackingId];
    })
    .then(([links, trackingId]) => {
      let url;

      links.forEach((link) => {
        if (link.rel === "action_url") {
          url = link.href;
        }
      });

      return {
        url: url,
        trackingId: trackingId,
      };
    });
}

/**
 * Get merchant ID from tracking ID
 */
async function getMerchantIdFromTrackingId(trackingId) {
  return getAccessToken()
    .then((accessToken) => {
      return fetch(
        `${BASE_URL}/v1/customer/partners/${PARTNER_ID}/merchant-integrations?tracking_id=${trackingId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    })
    .then(async (response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error((await response.json()).message);
      }
    })
    .then((data) => {
      return data.merchant_id;
    });
}

/**
 * Get seller status information from merchant ID
 *
 * {
 *    paymentsReceivable: true,
 *    primaryEmailConfirmed: true,
 *    oauthThirdPartyScopes: [
 *      "...",
 *      ...
 *    ]
 * }
 */
async function getSellerStatus(merchantId) {
  return getAccessToken()
    .then((accessToken) => {
      return fetch(
        `${BASE_URL}/v1/customer/partners/${PARTNER_ID}/merchant-integrations/${merchantId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    })
    .then(async (response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error((await response.json()).message);
      }
    })
    .then((data) => {
      return {
        paymentsReceivable: data.payments_receivable,
        primaryEmailConfirmed: data.primary_email_confirmed,
        oauthThirdPartyScopes:
          data.oauth_integrations[0].oauth_third_party[0].scopes,
      };
    });
}

/**
 * Get whether a merchant has completed their onboarding or not from a tracking ID
 *
 * {
 *    isMerchantOnboardingComplete: true,
 *    merchantId: "..."
 * }
 */
export async function isMerchantOnboardingCompleted(trackingId) {
  const merchantId = await getMerchantIdFromTrackingId(trackingId);
  return getSellerStatus(merchantId).then((sellerStatusInformation) => {
    if (
      sellerStatusInformation.paymentsReceivable &&
      sellerStatusInformation.primaryEmailConfirmed &&
      sellerStatusInformation.oauthThirdPartyScopes.length > 0
    ) {
      return {
        isMerchantOnboardingComplete: true,
        merchantId: merchantId,
      };
    }

    return {
      isMerchantOnboardingComplete: false,
      merchantId: merchantId,
    };
  });
}
