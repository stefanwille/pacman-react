import React, { FC } from 'react';
import { useGameStore } from '../../../model/store';
import styled from 'styled-components/macro';

export const FPS: FC<{ className?: string }> = ({ className }) => {
  const lastFrameLength = useGameStore((state) => state.game.lastFrameLength);
  return (
    <Layout className={className}>
      {Math.round(1000 / lastFrameLength)} FPS
    </Layout>
  );
};

const Layout = styled.div`
  margin-top: 12px;
`;
