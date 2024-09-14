"use client"
import React from 'react'
import Appbar from "../../components/appbar";
import { Box, Typography } from "@mui/material";
import useColors from '../../hooks/useColors';

type Props = {
  children?: React.ReactNode;
};

const DashboardLayout = (props: Props) => {
  const colors = useColors();
  return (
    <React.Fragment>
      <main className="content">
        <Appbar />
        <Box sx={{minHeight:"calc(100vh - 60px)"}}>{props.children}</Box>
        <Box
          sx={{
            height: "40px",
            borderTop: `2px solid ${colors.grey[200]}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            Design & Developed by{" "}
            <strong>Bit Brains.</strong>
          </Typography>
        </Box>
      </main>
    </React.Fragment>
  );
}

export default DashboardLayout;