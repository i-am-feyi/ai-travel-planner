import React, { forwardRef } from "react";
import { motion } from "framer-motion";

import "./styles.css";

const LPiece = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`lPiece ${className}`}>
        <div />
        <div />
      </div>
    );
  }
);

LPiece.displayName = "LPiece";

export default motion(LPiece);
