/* eslint-disable react/no-unescaped-entities */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { screenFromTile, TileCoordinates } from '../../model/Coordinates';
import { WayPoint } from './WayPoint';
import { getDirectionFromTileToTile } from '../../model/getDirectionFromTileToTile';
import { Direction } from '../../model/Types';
import { assert } from '../../util/assert';

export const WayPoints = observer<{
  wayPoints: TileCoordinates[];
  color: string;
}>(({ wayPoints, color }) => (
  <>
    {wayPoints.map((wayPoint, index) => {
      const screenCoordinates = screenFromTile(wayPoint);
      const direction = getDirection(wayPoints, index);
      return (
        <WayPoint
          key={index}
          screenCoordinates={screenCoordinates}
          color={color}
          direction={direction}
        />
      );
    })}
  </>
));

const getDirection = (
  wayPoints: TileCoordinates[],
  index: number
): Direction => {
  if (wayPoints.length <= 1) {
    return 'DOWN';
  }
  const indexToUse = index + 1 < wayPoints.length ? index : index - 1;
  const fromTile = wayPoints[indexToUse];
  const toTile = wayPoints[indexToUse + 1];
  assert(toTile, `${indexToUse} ${wayPoints.length}`);
  const direction = getDirectionFromTileToTile(fromTile, toTile);
  return direction;
};
