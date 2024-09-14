
import { TextField,TextFieldProps } from "@mui/material";
import useColors from "../../hooks/useColors";



const ContactInputField = ({ onKeyDown, onChange, sx, InputLabelProps, ...props }: TextFieldProps) => {
  const colors = useColors();
  return (
    <TextField
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        const allowedKeys = ["Backspace", "Enter", "Tab"];
        // Allow special keys: backspace, enter, tab
        if (allowedKeys.includes(event.key)) {
          return;
        }
        // Allow only digits
        if (/^\d$/.test(event.key)) {
          return;
        }
        // Prevent default action (typing) for all other keys
        event.preventDefault();
      }}
      onChange={(event) => {
        if (event.target.value.length > 10) {
          event.preventDefault();
        } else {
          onChange && onChange(event);
        }
      }}
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
      InputLabelProps={{
        style: {
          fontWeight: "bold",
        },
        ...InputLabelProps,
      }}
      {...props}
    />
  );
}

export default ContactInputField;