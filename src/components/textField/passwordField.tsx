import { useState } from "react";
import { TextInputField } from ".";
import { TextFieldProps, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordFieldProps = Omit<TextFieldProps, "type" | "name"> & {
  name: string;
};

const PasswordField = ({
  InputProps,
  sx,
  ...props
}: Readonly<PasswordFieldProps>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextInputField
      type={showPassword ? `text` : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
      sx={{
        "& .MuiInputBase-input.MuiOutlinedInput-input": {
        },
        ...sx
      }}
      {...props}
    />
  );
};

export default PasswordField;