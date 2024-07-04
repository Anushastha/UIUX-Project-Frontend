import React from "react";
import { motion, useScroll } from "framer-motion";
import "../styles/tailwind.css";

const LiIcon = ({ reference }) => {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ["center end", "center center"],
  });

  return (
    <figure className="tw-absolute tw-left-0 tw-stroke-blue">
      <svg
        className="tw-rotate-90 md:tw-w-[60px] md:tw-h-[60px] xs:tw-w-[40px] xs:tw-w-h-[40px]"
        width="75"
        height="75"
        viewBox="0 0 100 100"
      >
        <circle
          cx="75"
          cy="50"
          r="20"
          className="tw-stroke-blue tw-stroke-1 tw-fill-none"
        />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className=" tw-stroke-[5px] tw-fill-green"
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <circle
          cx="75"
          cy="50"
          r="10"
          className="tw-animate-pulse tw-stroke-1 tw-fill-blue"
        />
      </svg>
    </figure>
  );
};

export default LiIcon;
