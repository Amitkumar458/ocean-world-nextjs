import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Autocomplete, AutocompleteProps, SxProps, } from "@mui/material/";
import { AutocompleteOption } from "../../types/common";
import { Theme } from "@emotion/react";
import useColors from "../../hooks/useColors";
import { useField } from "formik";

type ExtendedAutocompleteProps = {
  // options: string[];
  onChange?: (evt:React.SyntheticEvent<Element, Event>, val: AutocompleteOption| null) => void;
  label?: string;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  BoxSx?:SxProps<Theme>
};

interface Props<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType<any> = "div",
  T = AutocompleteOption
> extends Omit<
      AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
      "renderInput" | "options" | "onChange"|"name"
    >,
    ExtendedAutocompleteProps {
  options: AutocompleteOption[];
  name: string;
}

const AutocompleteWithOptions = <
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType<any> = "div"
>({
  value,
  options,
  label,
  onChange,
  name,
  required,
  BoxSx,
  onBlur,
  ...props
}: Props<Multiple, DisableClearable, FreeSolo, ChipComponent>) => {
  const colors = useColors();
  const [field,meta,FormikHelpers] = useField(name);
  
  const textFieldConfig: TextFieldProps = {};
  if (meta?.touched && meta?.error) {
    textFieldConfig.error = true;
    textFieldConfig.helperText = meta.error;
  }
  
  return (
    <Autocomplete
      // id="autocomlete"
      options={options}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      value={value ?? field.value}
      onChange={(evt: React.SyntheticEvent<Element, Event>, val) => {
        onChange && onChange(evt, val as AutocompleteOption);
        FormikHelpers.setValue(val);
      }}
      onBlur={(evt) => {
        onBlur?.(evt);
        FormikHelpers.setTouched(true);
      }}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldConfig}
          label={label}
          name={name}
          required={required}
          fullWidth
          size="small"
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
            "& .MuiInputLabel-root.Mui-disabled": {
              color: `${colors.grey[300]} !important`,
            },
            "& .MuiInputLabel-root": {
              fontWeight: "bold",
            },
            // "& .MuiInputBase-input.MuiOutlinedInput-input": {
            //   height: "0.5rem !important",
            // },
            ...BoxSx,
          }}
        />
      )}
    />
  );
};

export default AutocompleteWithOptions;
