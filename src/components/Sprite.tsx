import React, { FC } from "react";
import classNames from "classnames";

export const Sprite: FC<{
  name: string;
  x: number;
  y: number;
  className?: string | null;
}> = ({ name: spriteName, x, y, className = null }) => {
  return (
    <div
      className={classNames("Sprite", "Sprite-" + spriteName, className)}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: `scale(3)`,
        transformOrigin: "top left"
      }}
    />
  );
};
