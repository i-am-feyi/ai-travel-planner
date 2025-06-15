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

JPiece.displayName = "JPiece";
export default motion(JPiece);
