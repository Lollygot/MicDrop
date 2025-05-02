const BASE_URL = "https://api-m.sandbox.paypal.com";
const CLIENT_ID =
  "AZLiYd_GTMoSgq45by8Z3Z66NrMAE-EfUBtTiwaqBSjRsbTDArpdCb0s_9Yz_xF9g7G0HgV-xFBi9aKI";
const CLIENT_SECRET =
  "EJ6lYnJVxZUkgOFQ6xWAUB2DyN-xxKgetr8NfifoImla4T7Of_HVp4kbePHt9LIzAVYOHmKYeB-2VZ93";

/**
 * Get an access token
 *
 * Return the access token as a string
 */
export async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  return fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&response_type=id_token",
  })
    .then(async (response) => {
      const body = await response.json();

      if (response.status === 200) {
        return body;
      } else {
        if (body?.message) {
          throw new Error(body.message);
        } else {
          throw new Error(body.error_description);
        }
      }
    })
    .then((data) => {
      return data.access_token;
    });
}
