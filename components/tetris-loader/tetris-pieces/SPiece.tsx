import React, { forwardRef } from "react";
import { motion } from "framer-motion";

import "./styles.css";

const SPiece = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`sPiece ${className}`}>
        <div />
        <div />
      </div>
    );
  }
);

SPiece.displayName = "SPiece";

export default motion(SPiece);
