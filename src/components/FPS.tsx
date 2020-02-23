/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../lib/StoreContext';
import './FPS.css';
import classNames from 'classnames';

export const FPS: FC<{ className?: string }> = observer(({ className }) => {
  const store = useStore();
  return (
    <span className={classNames('FPS', className)}>
      {Math.round(1000 / store.timeBetweenTicks)} FPS
    </span>
  );
});
