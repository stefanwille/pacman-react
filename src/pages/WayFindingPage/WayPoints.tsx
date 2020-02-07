/* eslint-disable react/no-unescaped-entities */
import React, { Fragment } from 'react';

import { Coordinates, screenFromTileCoordinate } from '../../lib/Coordinates';

import { WayPoint } from './WayPoint';
import { observer } from 'mobx-react-lite';

export const WayPoints: React.FC<{
  wayPoints: Coordinates[];
}> = observer(({ wayPoints }) => (
  <Fragment>
    {wayPoints.map((coordinates, index) => (
      <WayPoint
        key={index}
        x={screenFromTileCoordinate(coordinates[0])}
        y={screenFromTileCoordinate(coordinates[1])}
      />
    ))}
  </Fragment>
));
