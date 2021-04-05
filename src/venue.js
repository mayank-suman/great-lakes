import React, { useState, useEffect } from "react";
import Foursquare from "@foursquare/foursquare-places";

// need to create an .env file - see instructions in link
// https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const foursquare = new Foursquare(CLIENT_ID, CLIENT_SECRET);

const Venue = () => {
  const [items, setItems] = useState([]);
  const [photos, setPhotos] = useState([]);
  console.log("🚀 ~ file: venue.js ~ line 13 ~ Venue ~ photos", photos);
  console.log("🚀 ~ file: venue.js ~ line 12 ~ Venue ~ items", items);
  const [params, setParams] = useState({
    // ll: "37.7749,-122.4194",
    // ll: "53.7267,-127.647621",
    near: "Vancouver, BC, Canada",
    query: "",
    categoryId: "4bf58dd8d48988d161941735",
    limit: 3,
  });

  useEffect(() => {
    foursquare.venues.getVenues(params).then((res) => {
      setItems(res.response.venues);
    });
  }, [params]);

  useEffect(() => {
    const venuePhotoPromises = items.map((item) =>
      foursquare.venues.getVenuePhotos({ venue_id: item.id })
    );

    Promise.all(venuePhotoPromises).then((res) => {
      setPhotos(res.response);
    });
  }, [items]);

  return (
    <div>
      <div>Items:</div>
      {/* {JSON.stringify(items)} */}
      {items.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export default Venue;
