import React, { forwardRef } from "react";
import { motion } from "framer-motion";

import "./styles.css";

const TPiece = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`tPiece ${className}`}>
        <div />
        <div />
      </div>
    );
  }
);

TPiece.displayName = "TPiece";

export default motion(TPiece);
