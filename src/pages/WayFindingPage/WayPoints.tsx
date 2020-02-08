/* eslint-disable react/no-unescaped-entities */
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { screenFromTile, TileCoordinates } from '../../lib/Coordinates';
import { WayPoint } from './WayPoint';

export const WayPoints: React.FC<{
  wayPoints: TileCoordinates[];
}> = observer(({ wayPoints }) => (
  <Fragment>
    {wayPoints.map((wayPoint, index) => {
      const screen = screenFromTile(wayPoint);
      return <WayPoint key={index} x={screen.x} y={screen.y} />;
    })}
  </Fragment>
));
