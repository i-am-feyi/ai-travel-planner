import React from "react";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";

import {
  IPiece,
  JPiece,
  LPiece,
  OPiece,
  SPiece,
  TPiece,
  ZPiece,
} from "./tetris-pieces/index";
import "@/components/tetris-loader/tetris-pieces/";

// Inspired by Kevin Yang
// https://dribbble.com/shots/16710203-Tetris-Loading-Animation/attachments/11752365?mode=media

const TetrisLoader = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      const sequence = [
        [".jPiece-1", { opacity: 1 }],
        [".jPiece-1", { x: (1 + 6) * 15 }],
        [".jPiece-1", { rotate: 0 }],
        [".jPiece-1", { y: (2 + 7) * 15 }],

        [".iPiece-1", { opacity: 1 }],
        [".iPiece-1", { x: (4 + 0) * 15 }],
        [".iPiece-1", { y: (0 + 11) * 15 }],

        [".sPiece-1", { opacity: 1 }],
        [".sPiece-1", { x: (0 + 5) * 15 }],
        [".sPiece-1", { y: (0 + 10) * 15 }],

        [".oPiece", { opacity: 1 }],
        [".oPiece", { x: (0 + 1) * 15 }],
        [".oPiece", { y: (0 + 9) * 15 }],

        [".tPiece-1", { opacity: 1 }],
        [".tPiece-1", { y: (0 + 9) * 15 }],

        [".zPiece", { opacity: 1 }],
        [".zPiece", { y: (0 + 8) * 15 }],

        [".lPiece", { opacity: 1 }],
        [".lPiece", { x: (3 + 1) * 15 }],
        [".lPiece", { rotate: -180 }],
        [".lPiece", { y: (-1 + 6) * 15 }],

        [".tPiece-2", { opacity: 1 }],
        [".tPiece-2", { x: (0 + 6) * 15 }],
        [".tPiece-2", { rotate: -180 }],
        [".tPiece-2", { y: (0 + 8) * 15 }],

        [".jPiece-2", { opacity: 1 }],
        [".jPiece-2", { x: (-2 + 0) * 15 }],
        [".jPiece-2", { rotate: 180 }],
        [".jPiece-2", { y: (-1 + 6) * 15 }],

        [".iPiece-2", { opacity: 1 }],
        [".iPiece-2", { rotate: 0 }],
        [".iPiece-2", { x: (3 + 6) * 15 }],
        [".iPiece-2", { y: (1 + 7) * 15 }],
      ];

      // @ts-expect-error - Framer Motion types are not compatible with the latest version
      animate(sequence, { duration: 3.5, repeat: Infinity, repeatDelay: 1 });
    };
    animateLoader();
  }, [animate]);

  return (
    <div ref={scope}>
      <div className="tetris-grid">
        <JPiece
          className="tetris-piece jPiece-1"
          initial={{
            opacity: 0,
            y: (2 + 2) * 15,
            x: (1 + 3) * 15,
            rotate: 90,
            transformOrigin: "top right",
          }}
        />
        <IPiece
          className="tetris-piece iPiece-1"
          initial={{
            opacity: 0,
            y: (0 + 2) * 15,
            x: (4 + 3) * 15,
            rotate: 90,
            transformOrigin: "top left",
          }}
        />
        <SPiece
          className="tetris-piece sPiece-1"
          initial={{
            opacity: 0,
            y: (0 + 2) * 15,
            x: (0 + 3) * 15,
          }}
        />
        <OPiece
          className="tetris-piece oPiece"
          initial={{
            opacity: 0,
            y: (0 + 2) * 15,
            x: (0 + 4) * 15,
          }}
        />
        <TPiece
          className="tetris-piece tPiece-1"
          initial={{
            opacity: 0,
            y: (0 + 2) * 15,
            x: (2 + 4) * 15,
            rotate: 90,
            transformOrigin: "top left",
          }}
        />
        <ZPiece
          className="tetris-piece zPiece"
          initial={{
            opacity: 0,
            y: (0 + 2) * 15,
            x: (0 + 4) * 15,
          }}
        />
        <LPiece
          className="tetris-piece lPiece"
          initial={{
            opacity: 0,
            y: (-1 + 2) * 15,
            x: (3 + 3) * 15,
            rotate: -90,
            transformOrigin: "bottom left",
          }}
        />
        <TPiece
          className="tetris-piece tPiece-2"
          initial={{
            opacity: 0,
            y: (0 + 2) * 15,
            x: (0 + 3) * 15,
          }}
        />
        <JPiece
          className="tetris-piece jPiece-2"
          initial={{
            opacity: 0,
            y: (-1 + 2) * 15,
            x: (-2 + 3) * 15,
            rotate: 90,
            transformOrigin: "bottom right",
          }}
        />
        <IPiece
          className="tetris-piece iPiece-2"
          initial={{
            opacity: 0,
            y: (1 + 2) * 15,
            x: (3 + 3) * 15,
            rotate: 90,
            transformOrigin: "top right",
          }}
        />
      </div>
      <div className="tetris-base" />
    </div>
  );
};

export default TetrisLoader;
