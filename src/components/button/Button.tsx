import { Button as MUIButton, ButtonProps, Typography, SxProps, Theme } from "@mui/material";
import useColors from "../../hooks/useColors";
import CircularProgressComp from "../circularProgressComp";
import { ReactNode } from "react";

type Props = ButtonProps & {
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label?: string;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
  target?: string;
};

const Button = ({isLoading, onClick, sx, ...props}:Readonly<Props>) => {
  const colors = useColors();

  return (
    <MUIButton
      disabled={isLoading}
      onClick={onClick}
      sx={{
        backgroundColor: colors.greenAccent[500],
        "&:hover": {
          backgroundColor: colors.greenAccent[400],
          color: colors.primary[100],
        },
        color: colors.primary[200],
        ...sx,
      }}
      {...props}
    >
      {isLoading ? <CircularProgressComp /> : props.icon}
      <Typography sx={{ marginLeft: "4px" }}>
        {props.label ? props.label : "Login"}
      </Typography>
    </MUIButton>
  );
};

export default Button;
