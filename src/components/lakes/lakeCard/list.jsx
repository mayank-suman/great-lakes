import React from "react";
import Grid from "@material-ui/core/Grid";

import LakeItem from "./item";

export default function CardsList({ items }) {
  return (
    <Grid container justify="space-between">
      {items.map((item) => (
        <Grid item xs={12} sm={6} key={item.place_id}>
          <LakeItem itemProps={item} />
        </Grid>
      ))}
    </Grid>
  );
}
