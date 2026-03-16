"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const springFollowerConfig = { damping: 15, stiffness: 100 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const followerXSpring = useSpring(followerX, springFollowerConfig);
  const followerYSpring = useSpring(followerY, springFollowerConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 5);
      cursorY.set(e.clientY - 5);
      followerX.set(e.clientX - 20);
      followerY.set(e.clientY - 20);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
        document.body.classList.add('hover-active');
      } else {
        setIsHovered(false);
        document.body.classList.remove('hover-active');
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      <motion.div 
        className="custom-cursor" 
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div 
        className="custom-cursor-follower" 
        style={{ x: followerXSpring, y: followerYSpring }}
      />
    </>
  );
};

export default CustomCursor;
