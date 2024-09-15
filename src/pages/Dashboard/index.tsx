"use client"
import MotionBox from "@/components/framerMotion";
import DashboardLayout from "../../Layout/DashboardLayout";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import video from "/public/assets/videos/dashboard.mp4"
import MoveableCard from "@/components/card/MoveableCard";

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
      <MotionBox duration={2} stiffness={45} damping={8}>
        <div className="flex flex-col sm:flex-row items-center">
          <div className="lg:w-7/8 rounded-xl overflow-hidden lg:m-6 m-4">
            <ReactPlayer
              url={video}
              loop={true}
              controls={false}
              width={'100%'}
              height={'100%'}
              muted={true}
              playing={true}
            />
          </div>
          <div className="w-100 sm:mx-4 lg:mx-0 lg:mr-4 text-center gradient-text">
            <h1 className="text-2xl lg:text-4xl font-bold m-2">Ocean World!</h1>
            <h1 className="text-2xl lg:text-3xl font-bold  m-2">Interactive gamified
              approach to ocean literacy
            </h1>
            <h1 className="text-xl lg:text-2xl font-bold">Learn about the oceans in a fun way, play games, and discover how to protect and keep our environment clean for future generations.</h1>
          </div>
        </div>
        <h1 className="text-4xl m-4 text-center">
          More About Game
        </h1>
        <div className="flex flex-col justify-center sm:flex-row items-center mx-4">
          <MoveableCard
            title="Multi Language Support and Dynamic Content for different age groups"
            content="Our game supports multiple languages, allowing us to reach a wider audience without the need for separate versions. It support dynamic content so that different age groups can intract play and enjoy."
            src={"https://picsum.photos/200/300"}
            style={{margin:'8px'}}
          />
          <MoveableCard
            title="3D Game Enviroment With Different Challanging Tasks"
            content="User can intract with 3D world, including Ocean, Beach, and Islands. While completing various tasks, such as solving puzzles, Questions, managing resources we teach the player's about how to protect our oceans and keep our enviroment clean."
            src={"https://picsum.photos/198/300"}
            style={{margin:'8px'}}
          />
        </div>
      </MotionBox>
    </DashboardLayout>
  )
}

export default Dashboard;