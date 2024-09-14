import { Grid,GridProps } from "@mui/material"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode;
  itemProps?: GridProps;
}

const GridItem = ({children,itemProps}:Readonly<Props>) => {
  return (
    <Grid item lg={6} md={6} sm={12} xs={12} {...itemProps} >
      {children}
    </Grid>
  );
}

export default GridItem