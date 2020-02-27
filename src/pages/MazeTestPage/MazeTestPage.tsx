import React from 'react';
import { GridWithHoverCoordinates } from '../../components/Grid';
import { PacManSprite } from '../../components/PacMacView';
import { BasicPillHitBox, PillsView } from '../../components/PillsView';
import { Sprite } from '../../components/Sprite';
import { screenFromTileCoordinate } from '../../lib/Coordinates';

export const MazeTestPage: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />
      <GridWithHoverCoordinates screenCoordinates={{ x: 0, y: 0 }} />
      <PillsView />
      <Sprite
        className="Sprite-maze"
        name="maze-state-empty"
        x={16 * 16 * 3}
        y={0}
      />
      <GridWithHoverCoordinates screenCoordinates={{ x: 16 * 16 * 3, y: 0 }} />
      <Sprite x={8 * 3 * 1} y={8 * 3 * 1} name="basic-pill"></Sprite>
      <Sprite x={8 * 3 * 1} y={8 * 3 * 3} name="energizer"></Sprite>
      <Sprite x={8 * 3 * 6} y={8 * 3 * 10} name="energizer"></Sprite>
      <PacManSprite
        direction="RIGHT"
        phase={1}
        x={screenFromTileCoordinate(1)}
        y={screenFromTileCoordinate(3)}
      />
      <BasicPillHitBox />
    </div>
  );
};
