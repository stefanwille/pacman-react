/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../lib/StoreContext';

export const FPS: FC<{}> = observer(() => {
  const store = useStore();
  return <>{Math.round(1000 / store.timeBetweenTicks)} FPS</>;
});
