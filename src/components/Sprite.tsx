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
        transform: `translate(${x}px, ${y}px) scale(3)`
      }}
    />
  );
};
