import { Box, Typography } from "@mui/material";
import LottieSpinner from "../spinner";
import animationdata from "../spinner/animation.json";
import { imageBaseUrl } from "../../types/common";
import DummyImage from "../../assets/asset1.jpeg";

type Props = {
  url: string;
  isLoading?: boolean;
};

const ImageViewer = ({ url, isLoading }: Readonly<Props>) => {
  const imageurl = window.location.protocol.includes("https")
    ? `${imageBaseUrl}/${url}`
    : DummyImage;
  return (
    <>
      <></>
      {isLoading ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieSpinner animationData={animationdata} />
        </Box>
      ) : null}

      {url.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>File not found.</Typography>
        </Box>
      ) : null}

      <img
        src={`${imageurl}`}
        alt="report"
        style={{
          width: "100%",
          height: "auto",
          display:"block",
        }}
      />
    </>
  );
};

export default ImageViewer;
