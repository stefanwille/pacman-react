import { Menu } from 'antd';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { VSpace } from './Spacer';

export const AppMenu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const selectedKey = location.pathname;
  return (
    <div className="AppMenu">
      <MenuStyled
        mode="horizontal"
        onClick={event => {
          history.push(event.key.toString());
        }}
        selectedKeys={[selectedKey]}
      >
        <Menu.Item key="/">Home</Menu.Item>
        <Menu.Item key="/sprites">Sprites</Menu.Item>
        <Menu.Item key="/maze">Maze</Menu.Item>
        <Menu.Item key="/way-finding">Way Finding</Menu.Item>
      </MenuStyled>
      <VSpace size="large" />
    </div>
  );
};

const MenuStyled = styled(Menu)`
  background-color: inherit;
  border-bottom: none;
  margin-left: 4px;

  .ant-menu-item {
    color: white;
  }
`;
