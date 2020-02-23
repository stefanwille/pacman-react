/* eslint-disable react/no-unescaped-entities */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { screenFromTile, TileCoordinates } from '../../lib/Coordinates';
import { WayPoint } from './WayPoint';

export const WayPoints: React.FC<{
  wayPoints: TileCoordinates[];
}> = observer(({ wayPoints }) => (
  <>
    {wayPoints.map((wayPoint, index) => {
      const screenCoordinates = screenFromTile(wayPoint);
      return <WayPoint key={index} screenCoordinates={screenCoordinates} />;
    })}
  </>
));
