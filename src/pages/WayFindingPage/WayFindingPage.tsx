/* eslint-disable react/no-unescaped-entities */
import React, { useState, FC } from 'react';
import { Sprite } from '../../components/Sprite';
import { GridWithHoverCoordinates } from '../../components/Grid';

import { PacManSprite } from '../GamePage/components/PacManView';
import { GhostSprite } from '../GamePage/components/GhostsView';
import {
  screenFromTileCoordinate,
  TileCoordinates,
  SCREEN_TILE_CENTER,
} from '../../model/Coordinates';

import { WayPoints } from './WayPoints';
import { findWayPoints } from '../../model/findWayPoints';
import styled from 'styled-components/macro';
import { Row } from 'antd';

export const WayFindingPage: FC = () => {
  const [origin, setOrigin] = useState<TileCoordinates>({ x: 1, y: 1 });
  const [destination, setDestination] = useState<TileCoordinates>({ x: 6, y: 15 });

  const wayPoints = findWayPoints(origin, destination, 'RIGHT', true) ?? [];

  return (
    <Layout data-testid="WayfindingPage">
      <Row justify="center">
        <RelativeAbsoluteLayout>
          <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />

          <GridWithHoverCoordinates
            screenCoordinates={{ x: 0, y: 0 }}
            onClick={(
              coordinates: TileCoordinates,
              event: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              if (event.shiftKey) {
                setOrigin(coordinates);
              } else {
                setDestination(coordinates);
              }
            }}
          />

          <GhostSprite
            direction="RIGHT"
            ghostAnimationPhase={1}
            x={
              screenFromTileCoordinate(origin.x - 1) +
              SCREEN_TILE_CENTER
            }
            y={
              screenFromTileCoordinate(origin.y - 1) +
              SCREEN_TILE_CENTER
            }
            ghostNumber={0}
          />

          <PacManSprite
            direction="RIGHT"
            pacManAnimationPhase={1}
            x={
              screenFromTileCoordinate(destination.x - 1) +
              SCREEN_TILE_CENTER
            }
            y={
              screenFromTileCoordinate(destination.y - 1) +
              SCREEN_TILE_CENTER
            }
            style={{}}
          />

          <WayPoints wayPoints={wayPoints} color="#e2a12b"></WayPoints>
          <div style={{ position: 'absolute', top: 660, width: '300px' }}>
            Click sets pac man's position
            <br /> Shift-Click sets ghost position
          </div>
        </RelativeAbsoluteLayout>
      </Row>
    </Layout>
  );
};

const Layout = styled.div`
  margin-top: 32px;
`;

const RelativeAbsoluteLayout = styled.div`
  position: relative;
  width: 560px;
`;
