import { TextField, TextFieldProps } from "@mui/material";
import useColors from "../../hooks/useColors";
import { StringOrNumber } from "../../types/common";

interface Props extends Omit<TextFieldProps, "value"> {
  value: StringOrNumber;
}

const ControlledTextField = ({ name, sx,  ...props }: Readonly<Props>) => {
  const colors = useColors();

  return (
    <TextField
      sx={{
        "& input[type=number]": {
          MozAppearance: "textfield",
        },
        "& input[type=number]::-webkit-outer-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "& input[type=number]::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#000000",
        },
        "& .MuiInputLabel-root.Mui-disabled": {
          color: `${colors.grey[300]} !important`,
        },
        ...sx,
      }}
      size="small"
      {...props}
      InputLabelProps={{
        style: {
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default ControlledTextField;