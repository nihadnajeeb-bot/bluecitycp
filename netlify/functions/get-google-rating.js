/**
 * Netlify serverless function: fetches live rating and review count
 * from Google Places API (New) for your business.
 *
 * Required environment variables (set in Netlify dashboard or netlify.toml):
 *   GOOGLE_PLACE_ID   - Your business Place ID (e.g. ChIJ...)
 *   GOOGLE_PLACES_API_KEY - API key with Places API (New) enabled
 *
 * How to get Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id
 * Enable "Places API (New)" in Google Cloud Console and create an API key.
 */

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!PLACE_ID || !API_KEY) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: 'Missing GOOGLE_PLACE_ID or GOOGLE_PLACES_API_KEY in environment',
      }),
    };
  }

  const placeId = PLACE_ID.replace(/^places\//i, '');
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Places API error:', res.status, errText);
      return {
        statusCode: res.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Google Places API error', details: errText }),
      };
    }

    const data = await res.json();
    const rating = data.rating != null ? Number(data.rating) : null;
    const userRatingsTotal = data.userRatingCount != null ? Number(data.userRatingCount) : null;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        rating: rating,
        user_ratings_total: userRatingsTotal,
      }),
    };
  } catch (err) {
    console.error('get-google-rating error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: String(err.message) }),
    };
  }
};
