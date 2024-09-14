
import { MouseEvent } from "react";
import { Button, ButtonProps, Typography, } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import useColors from "../../hooks/useColors";



type Props = ButtonProps & {
  isLoading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  isDisabled?: boolean;
  label?: string;
};



const CancelButton = ({isLoading,onClick,sx,isDisabled,...props}:Props) => {
  const colors = useColors();

  return (
    <Button
      disabled={isLoading || isDisabled}
      onClick={(e) => {
        onClick?.(e);
      }}
      sx={{
        backgroundColor: colors.redAccent[500],
        "&:hover": {
          backgroundColor: colors.redAccent[400],
          color: colors.primary[100],
        },
        color: colors.primary[200],
        ...sx,
      }}
      {...props}
    >
      <Cancel />
      <Typography sx={{ marginLeft: "5px" }}>
        {props.label ? props.label : "Cancel"}
      </Typography>
    </Button>
  );
};

export default CancelButton;
