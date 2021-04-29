import React, { useEffect, useState, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { nearBySearch, getPlaceDetail } from "../../api/googleMaps";
import Autocomplete from "../placeAutocomplete.jsx";
const CardsList = React.lazy(() => import("./lakeCard/list.jsx"));

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
  header: {
    fontFamily: "'Dela Gothic One', cursive;",
    color: "#00bbec",
    padding: theme.spacing(2),
    fontSize: "5rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "7rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
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
        setSearchResult(res.results.splice(0, 3));
      }
    })();
  }, [currPlaceId]);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid container justify="center">
          <Typography variant="h1" component="h2" className={classes.header}>
            Great&nbsp;Lakes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            className={classes.autocomplete}
            onSelect={handleAutoCompleteSelect}
          />
        </Grid>
        {searchResult.length > 0 && (
          <Grid item>
            {/* TODO: instead on loader show skeleton */}
            <Suspense fallback={<CircularProgress color="inherit" />}>
              <CardsList items={searchResult} />
            </Suspense>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
