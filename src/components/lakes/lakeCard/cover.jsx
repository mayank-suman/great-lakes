import React, { useEffect, useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { getPhoto } from "../../../api/googleMaps";

const useStyles = makeStyles((theme) => ({
  loader: {
    margin: theme.spacing(2),
  },
}));

function cover({ photos }) {
  const classes = useStyles();
  const [getPhotoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getPhoto({
        referenceId: photos && photos[0]?.photo_reference,
        maxwidth: 250,
      });

      setPhotoUrl(res.url);
    })();
  }, []);

  //  TODO: use responsive images
  return (
    <>
      {getPhotoUrl ? (
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="150"
          image={getPhotoUrl}
          title="Contemplative Reptile"
        />
      ) : (
        <Grid container direction="row" justify="center" alignItems="center">
          <CircularProgress color="inherit" className={classes.loader} />
        </Grid>
      )}
    </>
  );
}

export default cover;
