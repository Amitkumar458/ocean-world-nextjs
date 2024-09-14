import { Refresh } from "@mui/icons-material"

const LoadingIcon = () => {
  return (
    <Refresh
      sx={{
        animation: "spin 1s linear infinite",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      }}
      fontSize="medium"
    />
  );
}

export default LoadingIcon