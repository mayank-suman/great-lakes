import React, { useEffect, useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";

import { getPhoto } from "../../../api/googleMaps";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
    [theme.breakpoints.up("md")]: {
      height: 300,
    },
    [theme.breakpoints.down("xs")]: {
      height: 250,
    },
  },
}));

let isFirstLoad = true;

function cover({ photos }) {
  const classes = useStyles();
  const [getPhotoUrl, setPhotoUrl] = useState("");
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {
    isFirstLoad = false;
    (async () => {
      setLoading(true);
      const res = await getPhoto({
        referenceId: photos && photos[0]?.photo_reference,
        maxwidth: 600,
      });

      setLoading(false);
      setPhotoUrl(res.url);
    })();

    return () => {
      isFirstLoad = true;
    };
  }, []);

  //  TODO: use responsive images
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rect" className={classes.root} />
      ) : getPhotoUrl ? (
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={getPhotoUrl}
          title="Contemplative Reptile"
          className={classes.root}
        />
      ) : (
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          className={classes.root}
        >
          {!isFirstLoad && <BrokenImageIcon />}
        </Grid>
      )}
    </>
  );
}

export default cover;
