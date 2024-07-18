import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getAutoCompletes } from "api/googleMaps.js";
import { Paper, Popper, PopperProps, styled } from "@material-ui/core";

// TODO: set default place
export default function placeAutocomplete({ onSelect }) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [currFieldVal, setFieldVal] = React.useState("");
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    if (!currFieldVal) return;

    (async () => {
      setLoading(true);
      const response = await getAutoCompletes({ input: currFieldVal });

      if (active) {
        setOptions(response.predictions);
      }

      setTimeout(() => {
        setLoading(false);
      }, 500);
    })();
    return () => {
      active = false;
    };
  }, [currFieldVal]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const CustomPopper = (props: PopperProps) => {
    return (
      <Popper {...props}>
        <Paper>
          {props.children}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <span style={{ padding: "5px" }}>
              <img
                src="public/images/powered_by_google_on_white.png"
                alt="powered by google"
              />
            </span>
          </div>
        </Paper>
      </Popper>
    );
  };

  return (
    <Autocomplete
      id="place-autocomplete"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={onSelect}
      getOptionSelected={(option, value) => option.place_id === value.place_id}
      getOptionLabel={(option) => option.description}
      options={options}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search location"
          variant="outlined"
          onChange={(e) => {
            setFieldVal(e.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      PopperComponent={CustomPopper}
      PaperComponent={(props) => <div {...props}>{props.children}</div>}
    />
  );
}
