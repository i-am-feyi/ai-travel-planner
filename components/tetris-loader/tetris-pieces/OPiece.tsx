import React, { forwardRef } from "react";
import { motion } from "framer-motion";

import "./styles.css";

const OPiece = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`oPiece ${className}`}>
        <div />
      </div>
    );
  }
);

export default motion(OPiece);
