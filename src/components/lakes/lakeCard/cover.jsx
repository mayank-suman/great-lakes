import React, { useEffect, useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

import { getPhoto } from "../../../api/googleMaps";

const useStyles = makeStyles((theme) => ({
  loader: {
    margin: theme.spacing(2),
  },
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

function cover({ photos }) {
  const classes = useStyles();
  const [getPhotoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getPhoto({
        referenceId: photos && photos[0]?.photo_reference,
        maxwidth: 600,
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
          image={getPhotoUrl}
          title="Contemplative Reptile"
          className={classes.root}
        />
      ) : (
        <Skeleton variant="rect" className={classes.root} />
      )}
    </>
  );
}

export default cover;
