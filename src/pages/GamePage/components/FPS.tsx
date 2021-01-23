import { observer } from 'mobx-react-lite';
import React from 'react';
import { useGame } from '../../../components/StoreContext';
import styled from 'styled-components/macro';

export const FPS = observer<{ className?: string }>(({ className }) => {
  const store = useGame();
  return (
    <Layout className={className}>
      {Math.round(1000 / store.lastFrameLength)} FPS
    </Layout>
  );
});

const Layout = styled.div`
  margin-top: 12px;
`;
