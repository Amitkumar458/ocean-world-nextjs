import React, { useState } from "react";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";

type Props = {
    title?: string;
    content?: string;
    src?: string;
    style? : object;
};

const MoveableCard = ({ title, content, src  , style}: Readonly<Props>) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [borderColor, setBorderColor] = useState("border-transparent");
    const [bgColor, setBgColor] = useState("bg-purple-200");

    // Mouse movement handler
    const handleMouseMove = (e: any) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        // Calculate rotation based on mouse position
        const xRotation = ((clientY - top) / height - 0.5) * 15;
        const yRotation = ((clientX - left) / width - 0.5) * -15;
        setRotation({ x: xRotation, y: yRotation });

        // Change border color based on mouse X-position
        const xPercent = ((clientX - left) / width) * 100;
        if (xPercent > 75) {
            setBorderColor("border-blue-500");
        } else if (xPercent > 50) {
            setBorderColor("border-green-500");
        } else if (xPercent > 25) {
            setBorderColor("border-yellow-500");
        } else {
            setBorderColor("border-red-500");
        }

        // Change background color based on mouse Y-position
        const yPercent = ((clientY - top) / height) * 100;
        if (yPercent > 75) {
            setBgColor("bg-white-500");
        } else if (yPercent > 50) {
            setBgColor("bg-white-100");
        } else if (yPercent > 25) {
            setBgColor("bg-white-200");
        } else {
            setBgColor("bg-white-300");
        }
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setBorderColor("border-transparent");
        setBgColor("bg-purple-200");
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
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded" src={src} alt="imges" />
            {(title || content) && <div className="flex flex-col justify-between p-4 leading-normal">
                {title && <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>}
                {content && <p className="mb-3 font-sans text-lg text-gray-800 dark:text-gray-400">{content}</p>}
            </div>}
        </motion.div>
    );
};

export default MoveableCard;
