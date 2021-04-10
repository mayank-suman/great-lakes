import React, { useEffect, useState } from "react";
import { nearBySearch, getPhoto } from "../../api/googleMaps";

import Places from "./Places.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import LakeItem from "./LakeItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   margin: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // },
}));

export default function index() {
  const [searchResult, setSearchResult] = useState([]);
  console.log(
    "🚀 ~ file: index.jsx ~ line 24 ~ index ~ searchResult",
    searchResult
  );

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
        setSearchResult(res.results.splice(0, 3));
      }
    })();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {searchResult.map((result) => (
          <LakeItem itemProps={result} key={result.place_id} />
        ))}
      </Grid>
    </div>
  );
}
