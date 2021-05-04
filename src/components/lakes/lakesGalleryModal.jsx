import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

import { getPlaceDetail, getPhoto } from "api/googleMaps";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  let modalHeight = "80vh";

  return {
    root: {
      width: "1000px",
      height: "1000px",
      maxWidth: "80vw",
      maxHeight: "80vh",
      /* [theme.breakpoints.down("xs")]: {
        maxHeight: "60vh",
      }, */
    },
    header: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    footer: {
      padding: theme.spacing(2),
    },
    imageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: `calc(${modalHeight} - 100px)`,
      width: "100%",
      backgroundColor: theme.palette.common.black,
    },
    img: {
      maxWidth: "100%",
      overflow: "hidden",
      display: "block",
    },
  };
});

// TODO: lazy load the component
// TODO: Fix focus trap
// TODO: add image loader

function LakesGalleryModal({ place, handleCloseButtonClick }) {
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (photosCount > 0) {
      (async () => {
        const currPhoto = photos[activeStep];
        if (currPhoto.url) return;

        const res = await getPhoto({
          referenceId: currPhoto?.photoId,
          maxwidth: 1280,
        });

        if (res?.url) {
          updatePhoto(activeStep, "url", res.url);
        }
      })();
    }
  }, [photos, activeStep]);

  return (
    <div className={classes.root}>
      {photosCount > 0 && (
        <Grid container direction="column" justify="space-between">
          <Grid item xs={12}>
            <Paper square elevation={0}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                className={classes.header}
              >
                <Typography>{photos[activeStep].label}</Typography>
                <CancelTwoToneIcon onClick={handleCloseButtonClick} />
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <div className={classes.imageContainer}>
              <img
                className={classes.img}
                src={photos[activeStep].url}
                alt={photos[activeStep].label}
              />
            </div>
          </Grid>
          <Grid item>
            <MobileStepper
              steps={photosCount}
              position="static"
              variant="text"
              activeStep={activeStep}
              className={classes.footer}
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
}

export default LakesGalleryModal;
