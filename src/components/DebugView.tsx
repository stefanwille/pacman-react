/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import React, { FC } from 'react';
import { Controls } from '../pages/GamePage/Controls';
import { FPS } from './FPS';
import { GhostsDebugView } from './GhostsDebugView';

export const DebugView: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames('DebugView', className)}>
      <GhostsDebugView />
      <Controls />
      <FPS />
    </div>
  );
};
