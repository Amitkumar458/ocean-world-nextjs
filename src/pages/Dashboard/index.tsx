"use client"
import MotionBox from "@/components/framerMotion";
import DashboardLayout from "../../Layout/DashboardLayout";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import video from "/public/assets/videos/dashboard.mp4"

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    console.log(video);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <MotionBox duration={2}>
        <ReactPlayer
          url={video}
          playing={true}
          loop={false}
          controls={true}
          width={'100%'}
          muted={true}
        />
      </MotionBox>
    </DashboardLayout>
  )
}

export default Dashboard;