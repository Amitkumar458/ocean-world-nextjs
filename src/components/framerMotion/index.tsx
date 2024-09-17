"use client"
import React, { ReactNode, CSSProperties, RefObject } from 'react';
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
  children?: ReactNode;
  delay?: number; // Delay
  ref? : RefObject<HTMLDivElement>;
}

// Base reusable motion component
const MotionBox: React.FC<MotionBoxProps> = ({
  initialY = '100vh',                // Default: bottom of the screen
  animateY = 0,                      // Default: move to top
  transitionType = 'spring',         // Default: spring animation
  stiffness = 50,                    // Default stiffness for spring
  damping = 10,                      // Default damping for spring
  duration = 1,                      // Default duration for tween
  delay = 0,                         // Default delay for tween
  style = {},                        // Custom styles for the component
  children, 
  ref,
}) => {
  const springTransition: Transition = {
    type: 'spring',
    stiffness,
    damping,
    delay
  };

  const tweenTransition: Transition = {
    duration,
    ease: 'easeInOut',
  };

  return (
    <motion.div
      initial={{ y: initialY }}
      animate={{ y: animateY }}
      transition={transitionType === 'spring' ? springTransition : tweenTransition}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        margin: '0 auto',
        ...style,
      }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export default MotionBox;
