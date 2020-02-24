/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import { Rectangle } from '../lib/Rectangle';

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
    }}
  />
);
