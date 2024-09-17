import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  title?: string;
  content?: string;
  src?: string;
  style?: object;
};

const MoveableCard = ({ title, content, src, style }: Readonly<Props>) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Mouse movement handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    // Calculate rotation based on mouse position
    const xRotation = ((clientY - top) / height - 0.5) * 15;
    const yRotation = ((clientX - left) / width - 0.5) * -15;
    setRotation({ x: xRotation, y: yRotation });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:h-50"
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        ...style,
      }}
    >
      <Image
        className="object-cover w-full rounded-t-lg md:rounded-none md:w-48"
        src={src ?? ""}
        alt="images"
        width={192} // Adjust width according to your design
        height={384} // Adjust height according to your design
        layout="responsive" // Use this for responsiveness
      />
      {(title || content) && (
        <div className="flex flex-col justify-between p-4 leading-normal">
          {title && (
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          )}
          {content && (
            <p className="mb-3 font-sans text-lg text-gray-800 dark:text-gray-400">
              {content}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MoveableCard;
