import React, { FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { SCALE_FACTOR } from '../model/Coordinates';
import './Sprite.css';

const scale = `scale(${SCALE_FACTOR})`;

export const Sprite: FC<{
  name: string;
  x: number;
  y: number;
  className?: string | null;
  style?: CSSProperties;
}> = ({ name: spriteName, x, y, className, style = {} }) => {
  return (
    <div
      className={classNames('Sprite', 'Sprite-' + spriteName, className)}
      style={{
        ...style,
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: scale,
        transformOrigin: 'top left',
      }}
    />
  );
};
