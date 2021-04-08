const apiBaseUrl = "https://maps.googleapis.com/maps/api";

// need to create an .env file - see instructions in link
// https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
const key = process.env.GOOGLE_MAPS_PLACES_API_KEY || "";

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
