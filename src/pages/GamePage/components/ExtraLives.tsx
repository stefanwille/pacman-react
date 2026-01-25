import React, { FC } from 'react';
import { useGameStore } from '../../../model/store';
import classNames from 'classnames';
import styled from 'styled-components/macro';
import { PacManSprite } from './PacManView';
import { times } from 'lodash';
import { SCALE_FACTOR } from '../../../model/Coordinates';

export const ExtraLives: FC<{ className?: string }> = ({ className }) => {
  const extraLivesLeft = useGameStore((state) => state.game.pacMan.extraLivesLeft);

  return (
    <Layout className={classNames('ExtraLives', className)}>
      <span>
        {times(extraLivesLeft, n => (
          <PacManSprite
            key={n}
            direction="LEFT"
            pacManAnimationPhase={1}
            x={n * 20 * SCALE_FACTOR}
            y={0}
          />
        ))}
      </span>
    </Layout>
  );
};

const Layout = styled.div`
  display: inline-flex;
  position: relative;
  width: calc(1 * 40px * var(--SCALE_FACTOR));
  height: calc(16px * var(--SCALE_FACTOR));
`;
