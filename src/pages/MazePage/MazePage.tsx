import React from 'react';
import { GridWithHoverCoordinates } from '../../components/Grid';
import { PacManSprite } from '../GamePage/components/PacManView';
import { BasicPillHitBox, PillsView } from '../GamePage/components/PillsView';
import { Sprite } from '../../components/Sprite';
import {
  screenFromTileCoordinate,
  SCREEN_TILE_CENTER,
} from '../../model/Coordinates';
import styled from 'styled-components/macro';
import { Row, Col } from 'antd';

export const MazePage: React.FC = () => {
  return (
    <Layout data-testid="MazePage">
      <Row justify="space-around">
        <Col flex="562px">
          <RelativeAbsoluteLayout>
            <Sprite
              className="Sprite-maze"
              name="maze-state-empty"
              x={0}
              y={0}
            />
            <GridWithHoverCoordinates screenCoordinates={{ x: 0, y: 0 }} />
            <PillsView />
          </RelativeAbsoluteLayout>
        </Col>

        <Col flex="562px">
          <RelativeAbsoluteLayout>
            <Sprite
              className="Sprite-maze"
              name="maze-state-empty"
              x={0}
              y={0}
            />
            <GridWithHoverCoordinates screenCoordinates={{ x: 0, y: 0 }} />
            <Sprite x={20 * 1} y={20 * 1} name="basic-pill"></Sprite>
            <Sprite x={20 * 1} y={20 * 3} name="energizer"></Sprite>
            <Sprite x={20 * 6} y={20 * 10} name="energizer"></Sprite>
            <PacManSprite
              direction="RIGHT"
              pacManAnimationPhase={1}
              x={screenFromTileCoordinate(1) + SCREEN_TILE_CENTER}
              y={screenFromTileCoordinate(4) + SCREEN_TILE_CENTER}
            />
            <BasicPillHitBox />
          </RelativeAbsoluteLayout>
        </Col>
      </Row>
    </Layout>
  );
};

const Layout = styled.div`
  margin: 32px;
`;

const RelativeAbsoluteLayout = styled.div`
  position: relative;
`;
