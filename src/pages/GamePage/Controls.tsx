/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useGame, useStore } from '../../components/StoreContext';
import { ghostCollidesWithPacMan } from '../../lib/detectCollisions';
import styled from 'styled-components/macro';
import { Button, Switch, Typography, Row, Col, Space } from 'antd';
import { action } from 'mobx';
import { eatEnergizer } from '../../lib/eatEnergizer';
import { Spacer } from '../../components/Spacer';

const { Text } = Typography;

export const Controls: FC<{}> = observer(() => {
  const store = useStore();
  const game = useGame();
  return (
    <div className="Controls">
      <Spacer height="24px" />
      <Space>
        <ButtonStyled size="small" onClick={store.resetGame}>
          Restart Game
        </ButtonStyled>
        {game.pacMan.state !== 'dead' && (
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
        {game.pacMan.state === 'dead' && (
          <ButtonStyled
            className="Controls__RevivePacMan"
            size="small"
            onClick={game.revivePacMan}
          >
            Revive Pac Man
          </ButtonStyled>
        )}
      </Space>

      <Spacer height="32px" />

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

      <Spacer height="32px" />

      <Space direction="vertical" style={{ width: '100%' }}>
        <Row>
          <Col flex="60px">
            <Switch
              checked={store.debugState.ghostViewOptions.target}
              onChange={action(checked => {
                store.debugState.ghostViewOptions.target = checked;
              })}
            />
          </Col>
          <Col flex="rest">
            <Text>Ghost Target</Text>
          </Col>
        </Row>

        <Row>
          <Col flex="60px">
            <Switch
              checked={store.debugState.ghostViewOptions.wayPoints}
              onChange={action(checked => {
                store.debugState.ghostViewOptions.wayPoints = checked;
              })}
            />
          </Col>
          <Col flex="rest">
            <Text>Ghost Waypoints</Text>
          </Col>
        </Row>

        <Row>
          <Col flex="60px">
            <Switch
              checked={store.debugState.ghostViewOptions.hitBox}
              onChange={action(checked => {
                store.debugState.ghostViewOptions.hitBox = checked;
              })}
            />
          </Col>
          <Col flex="rest">
            <Text>Ghost Hitbox</Text>
          </Col>
        </Row>
      </Space>
    </div>
  );
});

const ButtonStyled = styled(Button)`
  min-width: 120px;
`;
