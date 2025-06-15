import React, { forwardRef } from "react";
import { motion } from "framer-motion";

import "./styles.css";

const IPiece = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`iPiece ${className}`}>
        <div />
      </div>
    );
  }
);

export default motion(IPiece);
