import React, { lazy, Suspense } from "react";
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
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import Cover from "./cover.jsx";
import { getMapLinkUrl } from "api/googleMaps";
import useModal from "hooks/useModal";
const LakesGalleryModal = lazy(() =>
  import("components/lakes/lakesGalleryModal.jsx")
);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function LakeItem({ itemProps: place }) {
  const { name, photos, vicinity, rating } = place;
  const classes = useStyles();

  const { handleOpen, handleClose, isOpen, Modal } = useModal(
    <LakesGalleryModal
      place={place}
      handleCloseButtonClick={() => handleClose()}
    />
  );

  function handleCardClick(e) {
    e.preventDefault;
    handleOpen();
  }

  // TODO: create photos gallery modal
  return (
    <Card className={classes.root}>
      {isOpen && (
        <Suspense
          fallback={
            <Backdrop className={classes.backdrop} open>
              <CircularProgress color="inherit" />
            </Backdrop>
          }
        >
          <Modal />
        </Suspense>
      )}
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
