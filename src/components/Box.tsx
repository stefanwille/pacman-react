import React, { FC } from 'react';
import { Rectangle } from '../model/Rectangle';

export const Box: FC<{ rect: Rectangle; color: string }> = ({
  rect,
  color,
}) => (
  <div
    style={{
      position: 'absolute',
      left: rect.x,
      top: rect.y,
      width: rect.width,
      height: rect.height,
      backgroundColor: color,
      zIndex: 1000,
    }}
  />
);
