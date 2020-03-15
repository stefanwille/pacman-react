/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from './StoreContext';
import styled from 'styled-components/macro';

const Layout = styled.div`
  display: inline-block;
  margin-top: 12px;
  text-align: right;
  width: 100px;
`;

export const FPS: FC<{ className?: string }> = observer(({ className }) => {
  const store = useStore();
  return (
    <Layout className={className}>
      {Math.round(1000 / store.timeSinceLastFrame)} FPS
    </Layout>
  );
});
