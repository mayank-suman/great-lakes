import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";

import { getPhoto, getMapLinkUrl } from "../../api/googleMaps";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    margin: theme.spacing(1),
  },
  loader: {
    margin: theme.spacing(2),
  },
}));

export default function LakeCard({ itemProps }) {
  const classes = useStyles();
  const { name, photos } = itemProps;
  const [getPhotoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getPhoto({
        referenceId: photos && photos[0] && photos[0].photo_reference,
        maxwidth: 250,
      });

      setPhotoUrl(res.url);
    })();
  }, []);

  // TODO: create photos gallery modal
  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* TODO: add skeleton */}
        {/* TODO: use responsive images */}
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
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {itemProps.vicinity}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {itemProps.rating}
              <StarIcon fontSize="small" />
            </Grid>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="explore">
          <a href={getMapLinkUrl(itemProps)} target="blank">
            <ExploreIcon />
          </a>
        </IconButton>
      </CardActions>
    </Card>
  );
}
