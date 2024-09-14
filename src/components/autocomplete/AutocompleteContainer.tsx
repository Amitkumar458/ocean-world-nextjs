import { useEffect, useState, ElementType, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { AutocompleteOption, StringOrNumber } from "../../types/common";
import { useCrudApi } from "../../hooks/apis";
import { AdminCodes } from "../../util/routeConstants/admin/codes";
import { Box, SxProps, Theme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useColors from "../../hooks/useColors";
import { FormikErrors, FormikTouched } from "formik";

type FormFields = {
  [key: string]: StringOrNumber;
};

type autoCompleteQueryReq = {
  dropdownCode: keyof AdminCodes;
  replacements: number[];
};
type autoCompleteQueryRes = AutocompleteOption[];

export interface ExtendedAutocompleteProps {
  url: string;
  ddCode: keyof AdminCodes;
  label: string;
  onChange?: (
    e: React.SyntheticEvent<Element, Event>,
    val: AutocompleteOption
  ) => void;
  isViewOnly: boolean;
  name?: string;
  required?: boolean;
}

export interface AutocompleteCompProps<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends ElementType<any> = "div",
  T = AutocompleteOption
> extends Omit<
      AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
      "renderInput" | "options" | "onChange" | "name"
    >,
    ExtendedAutocompleteProps {
  itemId: string;
  itemName: string;
  replacements?: number[];
  boxProps?: SxProps<Theme>;
  removePadding?: boolean;
  isNotBorderRadious?: boolean;
  errors?: FormikErrors<FormFields>;
  touched?: FormikTouched<FormFields>;
  name: string;
}

export default function AutocompleteCotainer<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType<any> = "div"
>({
  value,
  onChange,
  onBlur,
  itemName,
  itemId,
  ddCode,
  replacements,
  isViewOnly,
  removePadding,
  boxProps,
  isNotBorderRadious,
  name,
  errors,
  touched,
  ...props
}: Readonly<
  AutocompleteCompProps<Multiple, DisableClearable, FreeSolo, ChipComponent>
>) {
  const [open, setOpen] = useState<boolean>(false);
  const colors = useColors();

  const autocompleteQuery = useCrudApi<
    autoCompleteQueryReq,
    autoCompleteQueryRes
  >("post", `${props.url}`);

  useEffect(() => {
    if (open) {
      autocompleteQuery.mutate({
        dropdownCode: ddCode,
        replacements: replacements || [],
      });
    }
  }, [open]);

  return (
    <Autocomplete
      id={name}
      open={open}
      onOpen={() => {
        if (!isViewOnly) {
          setOpen(true);
        }
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      onChange={(e, value) => {
        onChange?.(e, value as AutocompleteOption);
      }}
      onBlur={(evt) => {
        onBlur?.(evt);
      }}
      getOptionLabel={(option) => {
        return String((option as AutocompleteOption)[itemName]);
      }}
      sx={
        {
          // "& .MuiAutocomplete-popper": {
          //   backgroundColor:colors.primary[400]
          // },
          // "& .base-Popper-root": {
          //   backgroundColor:colors.primary[400]
          // },
        }
      }
      renderInput={({ ...params }) => (
        <TextField
          {...params}
          label={props.label}
          name={name}
          required={props.required}
          fullWidth={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: removePadding ? "0px" : undefined,
              borderRadius: isNotBorderRadious ? "0px" : undefined,
            },
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
            "& .MuiInputLabel-root.Mui-disabled": {
              color: `${colors.grey[300]} !important`,
            },
          }}
          size="small"
          InputLabelProps={{
            style: {
              fontWeight: "bold",
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {autocompleteQuery.isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
      options={
        autocompleteQuery.data?.data! || ([] as unknown as AutocompleteOption)
      }
      isOptionEqualToValue={(option, val) => {
        return option[itemName] === val[itemName];
      }}
      // autoComplete={false}
      loading={autocompleteQuery.isLoading}
      loadingText={<Box>Loading</Box>}
      {...props}
      readOnly={isViewOnly}
    />
  );
}
