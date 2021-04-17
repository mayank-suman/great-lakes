import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import useModal from "./useModal";
import { getPlaceDetail, getPhoto } from "../api/googleMaps";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
    height: "70vw",
  },
  header: {
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    maxWidth: "100%",
    overflow: "hidden",
    display: "block",
    width: "100%",
  },
}));

function useGalleryModal(place) {
  const classes = useStyles();
  const theme = useTheme();
  const { place_id } = place;

  const [photos, setPhotos] = useState({});
  const photosCount = Object.keys(photos).length;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function updatePhoto(index, property, value) {
    const photoToUpdate = photos[index];
    photoToUpdate[property] = value;

    setPhotos({
      ...photos,
    });
  }

  const html = (
    <div className={classes.root}>
      {photosCount > 0 && (
        <Grid container direction="column" justify="space-between">
          <Grid item>
            <Paper square elevation={0} className={classes.header}>
              <Typography>{photos[activeStep].label}</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <img
              className={classes.img}
              src={photos[activeStep].url}
              alt={photos[activeStep].label}
            />
          </Grid>
          <Grid item>
            <MobileStepper
              steps={photosCount}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === photosCount - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Grid>
        </Grid>
      )}
    </div>
  );

  const { handleOpen, handleClose, isOpen, Modal } = useModal(html);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        const { photos: photosMeta } = await getPlaceDetail({ place_id });
        const pm = photosMeta.reduce((finalObj, currMeta, index) => {
          finalObj[index] = {
            photoId: currMeta.photo_reference,
            url: "",
          };
          return finalObj;
        }, {});

        setPhotos(pm);
      })();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && photosCount > 0) {
      (async () => {
        const currPhoto = photos[activeStep];
        if (currPhoto.url) return;

        const res = await getPhoto({
          referenceId: currPhoto?.photoId,
          maxwidth: 1280,
        });

        updatePhoto(activeStep, "url", res.url);
      })();
    }
  }, [isOpen, photos, activeStep]);

  return {
    handleOpen,
    handleClose,
    isOpen,
    Gallery: Modal,
  };
}

export default useGalleryModal;
