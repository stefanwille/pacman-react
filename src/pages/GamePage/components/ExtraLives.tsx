import { observer } from 'mobx-react-lite';
import React from 'react';
import { useGame } from '../../../components/StoreContext';
import classNames from 'classnames';
import styled from 'styled-components/macro';
import { PacManSprite } from './PacManView';
import { times } from 'lodash';
import { SCALE_FACTOR } from '../../../model/Coordinates';

export const ExtraLives = observer<{ className?: string }>(({ className }) => {
  const game = useGame();
  return (
    <Layout className={classNames('ExtraLives', className)}>
      <span>
        {times(game.pacMan.extraLivesLeft, n => (
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
});

const Layout = styled.div`
  display: inline-flex;
  position: relative;
  width: calc(1 * 40px * var(--SCALE_FACTOR));
  height: calc(16px * var(--SCALE_FACTOR));
`;
