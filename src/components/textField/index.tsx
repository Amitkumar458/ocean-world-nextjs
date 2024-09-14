import { TextField, TextFieldProps } from "@mui/material";
import useColors from "../../hooks/useColors";
import { useField } from "formik";

interface TextInputFieldProps extends Omit<TextFieldProps,"name"> {
  name: string;
}



export const TextInputField = ({ sx,name,onChange, ...props }: TextInputFieldProps) => {
  const colors = useColors();
  const [{onChange:onFieldChange,...field}, meta] = useField(name);
  
  

  const textFieldConfig: TextFieldProps = {
    ...props,
    ...field,
    fullWidth: true,
    variant: "outlined",
  };
  
  if (meta?.touched && meta?.error) {
    textFieldConfig.error = true;
    textFieldConfig.helperText = meta.error;
  }
  
  
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
      {...textFieldConfig}
      onChange={(e)=>{
        onFieldChange(e)
        onChange?.(e)
      }}
      InputLabelProps={{
        style: {
          fontWeight: "bold",
        },
      }}
    />
  );
};
