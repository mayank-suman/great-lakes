import Foursquare from "@foursquare/foursquare-places";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const foursquare = new Foursquare(CLIENT_ID, CLIENT_SECRET);

export async function searchVenues(params) {
  const res = await foursquare.venues.getVenues(params);
  return res.response.venues;
}

export async function getVenueDetails(params) {
  const venueItems = await searchVenues(params);
  const venuePhotoPromises = venueItems.map((item) =>
    foursquare.venues.getVenue({ venue_id: item.id })
  );

  const res = await Promise.all(venuePhotoPromises);
  console.log("🚀 ~ file: venue.js ~ line 38 ~ res", res);
  return res;
}

export async function getVenuePhotos(params) {
  const venueArr = await getVenueDetails(params);

  const photosObj = venueArr.reduce((finalObj, currItem) => {
    finalObj[currItem.response.venue.id] = currItem.response.venue.bestPhoto;
    return finalObj;
  }, {});
  return photosObj;
}
