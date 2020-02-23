import React, { FC } from 'react';
import { Sprite } from './Sprite';

export const MazeView: FC<{}> = () => (
  <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />
);
