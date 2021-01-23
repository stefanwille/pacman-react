/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Sprite } from '../../components/Sprite';
import { GridWithHoverCoordinates } from '../../components/Grid';

import { PacManSprite } from '../GamePage/components/PacManView';
import { GhostSprite } from '../GamePage/components/GhostsView';
import {
  screenFromTileCoordinate,
  TileCoordinates,
  SCREEN_TILE_CENTER,
} from '../../model/Coordinates';
import { useLocalStore, observer } from 'mobx-react-lite';
import { action } from 'mobx';

import { WayPoints } from './WayPoints';
import { findWayPoints } from '../../model/findWayPoints';
import styled from 'styled-components/macro';
import { Row } from 'antd';

export const WayFindingPage = observer(() => {
  const localStore = useLocalStore(() => ({
    origin: { x: 1, y: 1 } as TileCoordinates,
    destination: { x: 6, y: 15 } as TileCoordinates,
    setOrigin: action((value: TileCoordinates) => {
      localStore.origin = value;
    }),
    setDestination: action((value: TileCoordinates) => {
      localStore.destination = value;
    }),
  }));

  const wayPoints =
    findWayPoints(localStore.origin, localStore.destination, 'RIGHT', true) ??
    [];

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
                localStore.setOrigin(coordinates);
              } else {
                localStore.setDestination(coordinates);
              }
            }}
          />

          <GhostSprite
            direction="RIGHT"
            ghostAnimationPhase={1}
            x={
              screenFromTileCoordinate(localStore.origin.x - 1) +
              SCREEN_TILE_CENTER
            }
            y={
              screenFromTileCoordinate(localStore.origin.y - 1) +
              SCREEN_TILE_CENTER
            }
            ghostNumber={0}
          />

          <PacManSprite
            direction="RIGHT"
            pacManAnimationPhase={1}
            x={
              screenFromTileCoordinate(localStore.destination.x - 1) +
              SCREEN_TILE_CENTER
            }
            y={
              screenFromTileCoordinate(localStore.destination.y - 1) +
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
});

const Layout = styled.div`
  margin-top: 32px;
`;

const RelativeAbsoluteLayout = styled.div`
  position: relative;
  width: 560px;
`;
