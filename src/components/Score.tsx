/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../lib/StoreContext';

export const Score: FC<{}> = observer(() => {
  const store = useStore();
  return <>Score: {store.score}</>;
});
