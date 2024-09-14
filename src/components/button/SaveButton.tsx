import { Button, ButtonProps, SxProps, Theme, Typography } from "@mui/material";
import { Save } from '@mui/icons-material';
import useColors from "../../hooks/useColors";
import CircularProgressComp from '../circularProgressComp'


type Props = ButtonProps & {
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label?: string;
  labelProps?: SxProps<Theme>;
};


const SaveButton = ({isLoading,onClick,sx,isDisabled,labelProps,...props}: Props) => {
  const colors = useColors();
  
  return (
    <Button
      disabled={isLoading || isDisabled}
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
      {isLoading ? <CircularProgressComp /> : <Save />}
      <Typography
        sx={{
          marginLeft: "10px",
          fontWeight: "500",
          paddingTop: "5px!important",
          ...labelProps,
        }}
      >
        {props.label ? props.label : "Save"}
      </Typography>
    </Button>
  );
}

export default SaveButton;