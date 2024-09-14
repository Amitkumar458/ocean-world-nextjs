import { MouseEvent } from "react";
import { Button, ButtonProps, Typography } from "@mui/material";
import { ClearAllRounded } from "@mui/icons-material";
import useColors from "../../hooks/useColors";

type Props = ButtonProps & {
  isLoading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  isDisabled?: boolean;
  label?: string;
};

const ClearButton = ({
  isLoading,
  onClick,
  sx,
  isDisabled,
  ...props
}: Props) => {
  const colors = useColors();

  return (
    <Button
      disabled={isLoading || isDisabled}
      onClick={(e) => {
        onClick?.(e);
      }}
      sx={{
        backgroundColor: colors.orange[500],
        "&:hover": {
          backgroundColor: colors.orange[400],
          color: colors.primary[100],
        },
        color: colors.primary[200],
        ...sx,
      }}
      {...props}
    >
      <ClearAllRounded />
      <Typography sx={{ marginLeft: "5px" }}>
        {props.label ? props.label : "Clear"}
      </Typography>
    </Button>
  );
};

export default ClearButton;
