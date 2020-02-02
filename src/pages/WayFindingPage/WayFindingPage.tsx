import React from 'react';
import { Sprite } from '../../components/Sprite';
import { GridWithHoverCoordinates } from '../../components/Grid';

import { PacManSprite } from '../../components/PacMacView';
import { GhostSprite } from '../../components/GhostsView';
import { Coordinates, screenFromTileCoordinate } from '../../lib/Coordinates';
import { useLocalStore, observer } from 'mobx-react-lite';
import { action } from 'mobx';

import { WayPoint } from './WayPoint';

export const WayFindingPage: React.FC = observer(() => {
  const localStore = useLocalStore(() => ({
    origin: [1, 1] as Coordinates,
    destination: [6, 14] as Coordinates,
    setDestination: action((value: Coordinates) => {
      localStore.destination = value;
    }),
    wayPoints: [
      [1, 2],
      [1, 3],
    ] as Coordinates[],
  }));
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
        onClick={(coordinates: Coordinates) => {
          localStore.setDestination(coordinates);
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

      {localStore.wayPoints.map((coordinates, index) => (
        <WayPoint
          key={index}
          x={screenFromTileCoordinate(coordinates[0])}
          y={screenFromTileCoordinate(coordinates[1])}
        />
      ))}
    </div>
  );
});
