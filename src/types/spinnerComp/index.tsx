import LottieSpinner from "../../components/spinner";
import animationadata from "../../components/spinner/animation.json";
import { Box, SxProps, Theme } from "@mui/material";

type SpinnerCompProps = {
  sx?: SxProps<Theme>;
}

const SpinnerComp = ({sx}:SpinnerCompProps) => {
  return (
    <Box sx={{ position: "absolute", top: "30%", left: "40%" ,...sx}}>
      <LottieSpinner animationData={animationadata} />
    </Box>
  );
}

export default SpinnerComp;