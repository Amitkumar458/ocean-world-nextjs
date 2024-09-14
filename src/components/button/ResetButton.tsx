import { ResetTv } from "@mui/icons-material";
import { MouseEvent } from "react";
import { Button, ButtonProps, Typography } from "@mui/material";
import useColors from "../../hooks/useColors";


type Props = ButtonProps & {
  isLoading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
};

const ResetButton = ({isLoading,onClick,sx,...props}:Props) => {
  const colors = useColors();

  return (
    <Button
      disabled={isLoading}
      onClick={(e) => {
        onClick && onClick(e);
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
      <ResetTv />
      <Typography>Reset</Typography>
    </Button>
  );
}

export default ResetButton