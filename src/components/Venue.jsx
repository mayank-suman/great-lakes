import React, { useState, useEffect } from "react";
import { searchVenues, getVenuePhotos } from "api/foursquare";

const Venue = () => {
  const [places, setPlaces] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [params, setParams] = useState({
    // ll: "37.7749,-122.4194",
    // ll: "53.7267,-127.647621",
    near: "Vancouver, BC, Canada",
    query: "",
    categoryId: "4bf58dd8d48988d161941735",
    limit: 3,
  });

  useEffect(() => {
    (async () => {
      const venue = await searchVenues(params);
      console.log("🚀 ~ file: venue.js ~ line 19 ~ venue", venue);
      setPlaces(venue);
    })();
  }, [params]);

  useEffect(() => {
    (async () => {
      const photosObj = await getVenuePhotos(params);
      setPhotos(photosObj);
    })();
  }, [places]);

  return (
    <div>
      <div>places:</div>
      <div>
        {Object.keys(photos).map((photoKey) => {
          const photo = photos[photoKey];
          const photoUrl = `${photo.prefix}original${photo.suffix}`;
          return (
            <>
              <image src={photoUrl}></image>
              <br />
            </>
          );
        })}
      </div>

      <pre>{JSON.stringify(places, undefined, 2)}</pre>
      {places.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export default Venue;
