/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useGame } from './StoreContext';
import classNames from 'classnames';
import styled from 'styled-components/macro';
import { PacManSprite } from './PacManView';
import { times } from 'lodash';
import { SCALE_FACTOR } from '../lib/Coordinates';

export const ExtraLives: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useGame();
    return (
      <Layout className={classNames('ExtraLives', className)}>
        <span>
          {times(game.pacMan.extraLivesLeft, n => (
            <PacManSprite
              key={n}
              direction="LEFT"
              phase={1}
              x={n * 20 * SCALE_FACTOR}
              y={0}
            />
          ))}
        </span>
      </Layout>
    );
  }
);

const Layout = styled.div`
  display: inline-flex;
  position: relative;
  width: calc(1 * 40px * var(--SCALE_FACTOR));
  height: calc(16px * var(--SCALE_FACTOR));
`;
