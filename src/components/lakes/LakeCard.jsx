import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import StarIcon from "@material-ui/icons/Star";

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

export default function LakeItem({ itemProps }) {
  const classes = useStyles();
  const { name, photos } = itemProps;
  console.log(
    "🚀 ~ file: LakeItem.jsx ~ line 25 ~ LakeItem ~ itemProps",
    itemProps
  );
  const [getPhotoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getPhoto({
        referenceId: photos && photos[0] && photos[0].photo_reference,
        maxwidth: 520,
      });

      setPhotoUrl(res.url);
    })();
  }, []);

  return (
    <Grid item xs={6}>
      <Card className={classes.root}>
        <CardActionArea>
          {getPhotoUrl ? (
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="150"
              image={getPhotoUrl}
              title="Contemplative Reptile"
            />
          ) : (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <CircularProgress color="inherit" className={classes.loader} />
            </Grid>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <span>{itemProps.rating}</span>
                <StarIcon fontSize="small" />
              </Grid>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <a href={getMapLinkUrl(itemProps)}>
                  <img src={itemProps.icon} width="25px"></img>
                </a>
                <span>{itemProps.vicinity}</span>
              </Grid>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
