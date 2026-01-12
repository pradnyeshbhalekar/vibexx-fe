"use client";

import { motion } from "framer-motion";
import { AudioWaveform } from "lucide-react";

interface LogoProps {
  iconSize: number;
}

const Logo: React.FC<LogoProps> = ({ iconSize }) => {
  // container slightly larger than icon so it breathes
  const containerSize = iconSize + 16;

  return (
    <motion.div
      layoutId="app-logo"
      className="rounded-full flex items-center justify-center"
      style={{
        width: containerSize,
        height: containerSize,
        boxShadow: `
          0px 4px 10px rgba(124,58,237,0.35),
          0px 10px 24px rgba(124,58,237,0.25)
        `,
      }}
      transition={{
        layout: { duration: 0.7, ease: "easeInOut" },
      }}
    >
      <AudioWaveform
        size={iconSize}
        className="text-white"
      />
    </motion.div>
  );
};

export default Logo;
