import React, { forwardRef } from "react";
import { motion } from "framer-motion";

import "./styles.css";

const JPiece = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`jPiece ${className}`}>
        <div />
        <div />
      </div>
    );
  }
);

export default motion(JPiece);
