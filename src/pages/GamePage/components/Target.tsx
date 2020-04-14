import React, { FC } from 'react';
import {
  TileCoordinates,
  SCREEN_TILE_SIZE,
  screenFromTileCoordinate,
  SCREEN_TILE_CENTER,
} from '../../../model/Coordinates';

const SIZE = SCREEN_TILE_SIZE * 2;
const OFFSET = SCREEN_TILE_CENTER - SIZE / 2;

export const Target: FC<{ tile: TileCoordinates; color: string }> = ({
  tile,
  color,
}) => (
  <div
    style={{
      position: 'absolute',
      left: screenFromTileCoordinate(tile.x) + OFFSET,
      top: screenFromTileCoordinate(tile.y) + OFFSET,
      width: SIZE,
      height: SIZE,
    }}
  >
    <svg version="1.1" viewBox="0 0 22 22">
      <path
        style={{ fill: color }}
        transform={`rotate(45 11 11) translate(-550.29-608.65)`}
        d="m559.29 611.65v1 5h-5-1v4h1 5v5 1h4v-1-5h6v-1-2-1h-1-5v-5-1z"
      />
    </svg>
  </div>
);
