/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Sprite } from '../../components/Sprite';
import { GridWithHoverCoordinates } from '../../components/Grid';

import { PacManSprite } from '../../components/PacMacView';
import { GhostSprite } from '../../components/GhostsView';
import {
  screenFromTileCoordinate,
  TileCoordinates,
} from '../../lib/Coordinates';
import { useLocalStore, observer } from 'mobx-react-lite';
import { action } from 'mobx';

import { WayPoints } from './WayPoints';
import { findWay } from '../../lib/findWay';

export const WayFindingPage: React.FC = observer(() => {
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

  const wayPoints = findWay(localStore.origin, localStore.destination) ?? [];

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />

      <GridWithHoverCoordinates
        x={0}
        y={0}
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
        phase={1}
        x={screenFromTileCoordinate(localStore.origin.x - 1)}
        y={screenFromTileCoordinate(localStore.origin.y - 1)}
        ghostNumber={0}
      />

      <PacManSprite
        direction="RIGHT"
        phase={1}
        x={screenFromTileCoordinate(localStore.destination.x - 1)}
        y={screenFromTileCoordinate(localStore.destination.y - 1)}
        style={{}}
      />

      <WayPoints wayPoints={wayPoints}></WayPoints>

      <div style={{ position: 'absolute', top: 700 }}>
        Click sets pac man's position
        <br /> Shift-Click sets ghost position,
      </div>
    </div>
  );
});
