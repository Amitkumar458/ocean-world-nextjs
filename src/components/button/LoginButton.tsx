import { Button, ButtonProps, Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";
import useColors from "../../hooks/useColors";
import CircularProgressComp from "../circularProgressComp";


type Props = ButtonProps & {
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label?: string;
};


const LoginButton = ({ isLoading, onClick,sx, ...props }: Props) => {
  const colors = useColors();

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      sx={{
        backgroundColor: colors.greenAccent[500],
        "&:hover": {
          backgroundColor: colors.greenAccent[400],
          color: colors.primary[100],
        },
        color: colors.primary[200],
        ...sx
      }}
      {...props}
    >
      {isLoading ? <CircularProgressComp /> : <LoginOutlined />}
      <Typography sx={{ marginLeft: "4px" }}>
        {props.label ? props.label : "Login"}
      </Typography>
    </Button>
  );
};

export default LoginButton;
