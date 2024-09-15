import { Card, CardContent, Typography, Box, SxProps, } from "@mui/material";
import { Theme } from "@emotion/react";
import useColors from "../../hooks/useColors";
import { ReactNode } from "react";

type Props = {
  title?: string;
  content: string | number;
  icon?: ReactNode;
  titleIcon?: ReactNode;
  sx?: SxProps<Theme>;
  titleProps?: SxProps<Theme>;
  contentProps?: SxProps<Theme>;
  cardContentSx?: SxProps<Theme>;
};

const CardComp = ({ titleProps, ...props }: Readonly<Props>) => {
  const colors = useColors();
  return (
    <Card sx={{ backgroundColor: `${colors.primary[400]}`, ...props.sx }}>
      <CardContent sx={{ ...props.cardContentSx }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {props.titleIcon}
          <Typography sx={{ ...titleProps }}>{props.title}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {props.icon}
          <Typography
            sx={{
              ...props.contentProps,
            }}
          >
            {props.content}+
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComp;
