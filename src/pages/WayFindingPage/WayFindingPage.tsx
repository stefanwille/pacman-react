/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Sprite } from '../../components/Sprite';
import { GridWithHoverCoordinates } from '../../components/Grid';

import { PacManSprite } from '../../components/PacMacView';
import { GhostSprite } from '../../components/GhostsView';
import { Coordinates, screenFromTileCoordinate } from '../../lib/Coordinates';
import { useLocalStore, observer } from 'mobx-react-lite';
import { action } from 'mobx';

import { WayPoints } from './WayPoints';
import { findWay } from '../../lib/Ways';

export const WayFindingPage: React.FC = observer(() => {
  const localStore = useLocalStore(() => ({
    origin: [1, 1] as Coordinates,
    destination: [6, 14] as Coordinates,
    setOrigin: action((value: Coordinates) => {
      localStore.origin = value;
    }),
    setDestination: action((value: Coordinates) => {
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
          coordinates: Coordinates,
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
        x={screenFromTileCoordinate(localStore.origin[0] - 1)}
        y={screenFromTileCoordinate(localStore.origin[1] - 1)}
        ghostNumber={0}
      />

      <PacManSprite
        direction="RIGHT"
        phase={1}
        x={screenFromTileCoordinate(localStore.destination[0] - 1)}
        y={screenFromTileCoordinate(localStore.destination[1] - 1)}
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
