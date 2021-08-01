import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: theme.spacing(2),
  },
}));

export default function GoogleBranding() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src="public/images/powered_by_google_on_white.png"></img>
    </div>
  );
}
