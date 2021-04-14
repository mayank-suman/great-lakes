import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { nearBySearch } from "../../api/googleMaps";
import LakeItem from "./LakeCard";
import Autocomplete from "../placeAutocomplete.jsx";

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
  const [searchResult, setSearchResult] = useState([]);
  console.log(
    "🚀 ~ file: index.jsx ~ line 24 ~ index ~ searchResult",
    searchResult
  );

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const res = await nearBySearch({
        location: "49.246292,-123.116226",
        radius: "50000",
        type: "natural_feature",
        keyword: "lake",
        fields: "photos,vicinity,name,rating,opening_hours,geometry",
      });

      if (res.status === "OK" && res?.results?.length > 0) {
        setSearchResult(res.results.splice(0, 2));
      }
    })();
  }, []);

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
          <Autocomplete className={classes.autocomplete} />
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
