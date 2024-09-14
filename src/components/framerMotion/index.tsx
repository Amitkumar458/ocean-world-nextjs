"use client"
import React, { ReactNode, CSSProperties } from 'react';
import { motion, Transition } from 'framer-motion';

// Define the types for the props
interface MotionBoxProps {
  initialY?: string | number;        // Initial position (Y-axis)
  animateY?: string | number;        // Final position (Y-axis)
  transitionType?: 'spring' | 'tween'; // Type of transition (spring or tween)
  stiffness?: number;                // Stiffness for the spring transition
  damping?: number;                  // Damping for the spring transition
  duration?: number;                 // Duration for the tween transition
  style?: CSSProperties;             // Custom CSS styles for the component
  children?: ReactNode;              // Children to render inside the component
}

// Base reusable motion component
const MotionBox: React.FC<MotionBoxProps> = ({
  initialY = '100vh',                // Default: bottom of the screen
  animateY = 0,                      // Default: move to top
  transitionType = 'spring',         // Default: spring animation
  stiffness = 50,                    // Default stiffness for spring
  damping = 10,                      // Default damping for spring
  duration = 1,                      // Default duration for tween
  style = {},                        // Custom styles for the component
  children,                          // Children to render inside
}) => {
  // Define transition based on type
  const springTransition: Transition = {
    type: 'spring',
    stiffness,
    damping,
  };

  const tweenTransition: Transition = {
    duration,
    ease: 'easeInOut',
  };

  return (
    <motion.div
      initial={{ y: initialY }}               // Set initial Y position
      animate={{ y: animateY }}               // Set target Y position
      transition={transitionType === 'spring' ? springTransition : tweenTransition} // Choose transition type
      style={{
        width: '100%',                       // Default width
        height: '100%',                      // Default height
        backgroundColor: 'white',          // Default background color
        margin: '0 auto',                     // Center the box
        ...style,                             // Override with custom styles
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionBox;
