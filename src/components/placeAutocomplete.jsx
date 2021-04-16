import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getAutoCompletes } from "../api/googleMaps";

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
    />
  );
}
