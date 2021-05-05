import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import ExploreIcon from "@material-ui/icons/Explore";
import Button from "@material-ui/core/Button";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import Cover from "./cover.jsx";
import { getMapLinkUrl } from "api/googleMaps";
import LakesGalleryModal from "components/lakes/lakesGalleryModal.jsx";
import useModal from "hooks/useModal";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function LakeItem({ itemProps: place }) {
  const classes = useStyles();

  const { handleOpen, handleClose, isOpen, Modal } = useModal(
    <LakesGalleryModal
      place={place}
      handleCloseButtonClick={() => handleClose()}
    />
  );

  const { name, photos, vicinity, rating } = place;

  function handleCardClick(e) {
    e.preventDefault;
    handleOpen();
  }

  // TODO: create photos gallery modal
  return (
    <Card className={classes.root}>
      <Modal />
      <Cover photos={photos} />
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
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ExploreIcon />}
          onClick={() => window.open(getMapLinkUrl(place))}
        >
          Explore
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<PhotoLibraryIcon />}
          onClick={handleCardClick}
        >
          gallery
        </Button>
      </CardActions>
    </Card>
  );
}
