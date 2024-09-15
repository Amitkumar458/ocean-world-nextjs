"use client"
import React from 'react'
import { Box, Typography } from "@mui/material";
import useColors from '../../hooks/useColors';
import AppbarComp from '@/components/appbar';
import MotionBox from '@/components/framerMotion';

type Props = {
  children?: React.ReactNode;
};

const DashboardLayout = (props: Props) => {
  const colors = useColors();
  return (
    <React.Fragment>
      <main className="content">
      <MotionBox
        initialY="-100vh" 
        animateY={0}
        transitionType="spring"
        stiffness={60}
        damping={15}
        delay={0.4}
      >
        <AppbarComp/>
      </MotionBox>
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