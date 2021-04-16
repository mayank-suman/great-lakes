import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { nearBySearch, getPlaceDetail } from "../../api/googleMaps";
import LakeItem from "./lakeCard";
import Autocomplete from "../placeAutocomplete.jsx";

function getLakesParams(location) {
  return {
    location,
    radius: "50000",
    type: "natural_feature",
    keyword: "lake",
    fields: "photos,vicinity,name,rating,opening_hours,geometry",
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  autocomplete: {
    margin: theme.spacing(1),
  },
}));

export default function index() {
  const classes = useStyles();
  const [searchResult, setSearchResult] = useState([]);
  const [currPlaceId, setCurrPlaceId] = useState("");

  function handleAutoCompleteSelect(event, selectedPlace) {
    setCurrPlaceId(selectedPlace.place_id);
  }

  useEffect(() => {
    (async () => {
      if (!currPlaceId) return;

      const {
        geometry: { location },
      } = await getPlaceDetail({ place_id: currPlaceId });

      const locationCoordinates = Object.values(location).join(",");
      const res = await nearBySearch(getLakesParams(locationCoordinates));

      if (res.status === "OK" && res?.results?.length > 0) {
        // TODO: show full data later
        // TODO: add pagination
        setSearchResult(res.results.splice(0, 2));
      }
    })();
  }, [currPlaceId]);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item>
          <Autocomplete
            className={classes.autocomplete}
            onSelect={handleAutoCompleteSelect}
          />
        </Grid>
        <Grid item>
          <Grid container>
            {searchResult.map((result) => (
              <Grid item xs={6} key={result.place_id}>
                <LakeItem itemProps={result} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
