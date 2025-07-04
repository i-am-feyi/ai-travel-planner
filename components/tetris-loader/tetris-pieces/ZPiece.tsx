import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const ZPiece = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`zPiece ${className}`}>
        <div />
        <div />
      </div>
    );
  }
);

ZPiece.displayName = "ZPiece";

export default motion(ZPiece);
