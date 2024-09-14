import { IconButton,Typography } from "@mui/material";
import CircularProgressComp from "../circularProgressComp";
import { ToggleOff,ToggleOn } from "@mui/icons-material";
import useColors from "../../hooks/useColors";
import { WarnningAlert } from "../../util/alert";


type Props = {
  onActiveInactive?: () => void;
  activeInactiveStatus?: "active"|"suspended";
  isActiveInactiveLoading?: boolean;
};

const ActiveInactiveButton = (props: Readonly<Props>) => {
  const colors = useColors();
  
  return (
    <>
      <></>
      <IconButton
        sx={{
          color:
            props.activeInactiveStatus?.toLowerCase() === "active"
              ? colors.redAccent[500]
              : colors.greenAccent[500],
          marginLeft: "10px",
          borderRadius: "24px",
        }}
        onClick={() => {
          const status =
            props.activeInactiveStatus?.toLowerCase().trim() === "suspended"
              ? "Activate"
              : "Suspend";
          
          WarnningAlert(`Are you sure to ${status}?`, () => {
            props.onActiveInactive?.();
          });
        }}
      >
        <>
          <></>
          {props.isActiveInactiveLoading ? (
            <CircularProgressComp size="1rem" />
          ) : null}
          {props.activeInactiveStatus?.toLowerCase() === "suspended" ? (
            <>
              <></>

              <ToggleOn fontSize="large" />
              <Typography
                sx={{
                  fontSize: ".8rem",
                  marginLeft: "5px",
                  fontWeight: "500",
                }}
              >
                Activate
              </Typography>
            </>
          ) : (
            <>
              <></>
              <ToggleOff fontSize="large" />
              <Typography
                sx={{
                  fontSize: ".9rem",
                  marginLeft: "5px",
                  fontWeight: "500",
                }}
              >
                Suspend
              </Typography>
            </>
          )}
        </>
      </IconButton>
    </>
  );
}

export default ActiveInactiveButton;