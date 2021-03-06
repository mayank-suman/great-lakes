// eslint-disable-next-line no-undef
const apiBaseUrl = `${GOOGLE_MAPS_API_BASE_URL}/maps/api`;

// need to create an .env file - see instructions in link
// https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
// eslint-disable-next-line no-undef
export const key = process.env.GOOGLE_MAPS_PLACES_API_KEY || "";
const randomSessionId = Math.random().toString(36).slice(2);

const fetchOptions = {
  method: "GET",
  redirect: "follow",
};

export async function findPlaceFromText(params) {
  try {
    const url = `${apiBaseUrl}/place/findplacefromtext/json`;

    const queryParams = new URLSearchParams({
      ...params,
      key,
    });

    const res = await fetch(`${url}?${queryParams.toString()}`, fetchOptions);

    const data = await res.json();
    return data.candidates;
  } catch (error) {
    return error;
  }
}

export async function getPlaceDetail(params) {
  try {
    const url = `${apiBaseUrl}/place/details/json`;

    const queryParams = new URLSearchParams({
      ...params,
      key,
      sessiontoken: randomSessionId,
    });

    const res = await fetch(`${url}?${queryParams.toString()}`, fetchOptions);

    const data = await res.json();
    return data.result;
  } catch (error) {
    return error;
  }
}

export async function nearBySearch(params) {
  try {
    const url = `${apiBaseUrl}/place/nearbysearch/json`;

    const queryParams = new URLSearchParams({
      ...params,
      key,
    });

    const res = await fetch(`${url}?${queryParams.toString()}`, fetchOptions);

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getAutoCompletes(params) {
  const { input = "" } = params;
  try {
    const url = `${apiBaseUrl}/place/autocomplete/json`;

    const queryParams = new URLSearchParams({
      ...params,
      input,
      key,
      sessiontoken: randomSessionId,
    });

    const res = await fetch(`${url}?${queryParams.toString()}`, fetchOptions);

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getPhoto(params) {
  const { maxwidth = 400, referenceId = "" } = params;
  try {
    const url = `${apiBaseUrl}/place/photo`;

    const queryParams = new URLSearchParams({
      maxwidth,
      photoreference: referenceId,
      key,
    });

    const res = await fetch(`${url}?${queryParams.toString()}`, fetchOptions);

    if (!res.ok) {
      throw error(res.status);
    }

    return res;
  } catch (error) {
    return error;
  }
}

// https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393&query_place_id=ChIJKxjxuaNqkFQR3CK6O1HNNqY
export function getMapLinkUrl({ geometry, place_id }) {
  const queryParams = new URLSearchParams({
    api: 1,
    query: `${geometry?.location?.lat},${geometry?.location?.lng}`,
    query_place_id: place_id,
  });

  return `https://www.google.com/maps/search/?${queryParams.toString()}`;
}
