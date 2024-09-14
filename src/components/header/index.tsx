import { Typography, Box } from "@mui/material";
import useColors from "../../hooks/useColors";
import useProgram from "../../hooks/useProgram";
import { ReactNode } from "react";

type Props = {
  subTitle?: string;
  subTitleComponent?: ReactNode;
};


const HeaderComp = ({ subTitle, subTitleComponent }: Props) => {
  const colors = useColors();
  const { programDesc, menuDesc } = useProgram();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      sx={{ borderBottom: `1px solid ${colors.grey[100]}`, height: "40px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          fontWeight={"400"}
          sx={{
            textTransform: "capitalize",
            typography: { md: "h4", sm: "h5", xs: "h5" },
            padding: "10px",
          }}
        >
          {menuDesc} {`>`} {programDesc}
        </Typography>
        <Typography
          color={colors.greenAccent[400]}
          sx={{
            textTransform: "capitalize",
            typography: { md: "h4", sm: "h5", xs: "h5" },
            padding: "10px",
          }}
        >
          {subTitle}
        </Typography>
      </Box>
      <Box>{subTitleComponent}</Box>
    </Box>
  );
};

export default HeaderComp;
