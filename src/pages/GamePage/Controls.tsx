import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useGame, useStore } from '../../components/StoreContext';
import { ghostCollidesWithPacMan } from '../../lib/detectCollisions';
import styled from 'styled-components/macro';
import { Button, Switch, Typography, Row, Col, Space } from 'antd';
import { VSpace } from '../../components/Spacer';

const { Text } = Typography;

export const Controls: FC<{}> = observer(() => {
  const store = useStore();
  const game = useGame();
  return (
    <div className="Controls">
      <Space>
        <ButtonStyled size="small" onClick={store.resetGame}>
          Restart Game
        </ButtonStyled>

        {game.pacMan.alive && (
          <ButtonStyled
            className="Controls__KillPacMan"
            size="small"
            onClick={() => {
              ghostCollidesWithPacMan(game.ghosts[0]);
            }}
          >
            Kill Pac Man
          </ButtonStyled>
        )}
      </Space>

      <VSpace size="32px" />

      <Row>
        <Col flex="60px">
          <Switch
            checked={game.gamePaused}
            onChange={checked => game.setGamePaused(checked)}
          />
        </Col>
        <Col flex="rest">
          <Text>Paused</Text>
        </Col>
      </Row>

      <VSpace size="32px" />
    </div>
  );
});

const ButtonStyled = styled(Button)`
  min-width: 120px;
`;
