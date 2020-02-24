/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import {
  TileCoordinates,
  TILE_SIZE,
  screenFromTileCoordinate,
} from '../lib/Coordinates';

export const Target: FC<{ tile: TileCoordinates; color: string }> = ({
  tile,
  color,
}) => (
  <div
    style={{
      position: 'absolute',
      left: screenFromTileCoordinate(tile.x) - TILE_SIZE,
      top: screenFromTileCoordinate(tile.y) - TILE_SIZE,
      width: TILE_SIZE * 2,
      height: TILE_SIZE * 2,
    }}
  >
    <svg version="1.1" viewBox="0 0 22 22">
      <path
        style={{ fill: color }}
        id="path4138"
        transform="translate(-550.29-608.65)"
        fill="#4d4d4d"
        d="m559.29 611.65v1 5h-5-1v4h1 5v5 1h4v-1-5h6v-1-2-1h-1-5v-5-1z"
      />
    </svg>
  </div>
);
