"use client"
import MotionBox from "@/components/framerMotion";
import DashboardLayout from "../../Layout/DashboardLayout";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <MotionBox duration={2}>
        <ReactPlayer
          url={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
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