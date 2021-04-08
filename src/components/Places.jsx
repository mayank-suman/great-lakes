import React, { useEffect, useState } from "react";
import { nearBySearch, getPhoto } from "../api/googleMaps";

export default function Places() {
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    (async () => {
      /* const res = await findPlaceFromText({
        input: "lakes",
        inputtype: "textquery",
        fields:
          "photos,formatted_address,name,rating,opening_hours,geometry,type",
      }); */

      const res = await nearBySearch({
        location: "49.246292,-123.116226",
        radius: "50000",
        type: "natural_feature",
        keyword: "lake",
        fields:
          "photos,formatted_address,name,rating,opening_hours,geometry,type",
      });

      console.log("🚀 ~ file: Places.jsx ~ line 38 ~ res", res);

      if (res.status === "OK" && res?.results?.length > 0) {
        setSearchResult(res.results.splice(0, 3));
      }

      const res1 = await getPhoto({
        referenceId:
          "ATtYBwJoahVFUrTn-PeXMQztTXPkOJwWOx_KNOOZ-iyXBMsbYJJrnABkv8HTcl0GHmxwCxtWEt6muftgtecWKKLYicCWqiJ_4HsXxx24L7oL8UpyHaHlmV3NlvVo7Ds13E8axbY6XWy505nbjv3bQwSNvMU67sToA4-nbqGQtwuDyqsWtX1t",
      });

      console.log("🚀 ~ file: Places.jsx ~ line 43 ~ res1", res1.url);
    })();
  }, []);
  return (
    <div>
      <span>Places</span>
      <pre>{JSON.stringify(searchResult, undefined, 2)}</pre>
    </div>
  );
}
