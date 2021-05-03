import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";

import Cover from "./cover.jsx";
import { getMapLinkUrl } from "api/googleMaps";
import useGalleryModal from "hooks/useGalleryModal";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    margin: theme.spacing(1),
  },
}));

export default function LakeCard({ itemProps: place }) {
  const classes = useStyles();
  const { handleOpen, handleClose, isOpen, Gallery } = useGalleryModal(place);
  const { name, photos, vicinity, rating } = place;

  function handleCardClick(e) {
    e.preventDefault;
    console.log("click");
    handleOpen();
  }

  // TODO: create photos gallery modal
  return (
    <Card className={classes.root} onClick={handleCardClick}>
      <CardActionArea>
        <Cover photos={photos} />
        <Gallery />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {vicinity}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {rating}
              <StarIcon fontSize="small" />
            </Grid>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="explore">
          <a href={getMapLinkUrl(place)} target="blank">
            <ExploreIcon />
          </a>
        </IconButton>
      </CardActions>
    </Card>
  );
}
