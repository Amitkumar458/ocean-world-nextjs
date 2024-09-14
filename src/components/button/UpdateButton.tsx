import { Button, ButtonProps } from "@mui/material";
import useColors from "../../hooks/useColors";
import { Update } from "@mui/icons-material";
import LoadingIcon from "../../util/CircularRotatingIcon";


type Props = ButtonProps & {
  label?: string;
  isLoading?: boolean;
};

const UpdateButton = ({ sx, label, isLoading, ...props }: Readonly<Props>) => {
  const colors = useColors();

  return (
    <Button
      sx={{
        backgroundColor: colors.greenAccent[400],
        color: colors.primary[400],
        ":hover": {
          backgroundColor: colors.greenAccent[500],
        },
        ...sx,
      }}
      {...props}
    >
      {isLoading ? <LoadingIcon /> : <Update />}
      <span style={{ marginLeft: "10px" }}>{label ?? "Update"}</span>
    </Button>
  );
};

export default UpdateButton;
