import { Box, IconButton, Typography } from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import useColors from "../../hooks/useColors";

type ActionButtonsProps = {
  onViewClick?: () => void;
  isViewDisabled?:boolean
};

const ActionButtons = ({ onViewClick,isViewDisabled }: Readonly<ActionButtonsProps>) => {
  const colors = useColors();

  return (
    <Box>
      {onViewClick ? (
        <IconButton
          sx={{ borderRadius: "24px" }}
          onClick={onViewClick}
          disabled={isViewDisabled}
        >
          <RemoveRedEyeOutlined
            sx={{
              color: isViewDisabled
                ? colors.grey[200]
                : colors.greenAccent[400],
            }}
          />
          <Typography
            sx={{
              color: isViewDisabled
                ? colors.grey[200]
                : colors.greenAccent[400],
              marginLeft: "5px",
            }}
          >
            View
          </Typography>
        </IconButton>
      ) : null}
    </Box>
  );
};

export default ActionButtons;
