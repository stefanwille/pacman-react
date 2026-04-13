import { Menu } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { VSpace } from './Spacer';

export const AppMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKey = location.pathname;
  return (
    <AppMenuWrapper>
      <MenuStyled
        mode="horizontal"
        onClick={(event: { key: React.Key }) => {
          navigate(event.key.toString());
        }}
        selectedKeys={[selectedKey]}
        items={[
          { key: '/', label: 'Home' },
          { key: '/sprites', label: 'Sprites' },
          { key: '/maze', label: 'Maze' },
          { key: '/way-finding', label: 'Way Finding' },
        ]}
      />
      <VSpace size="large" />
    </AppMenuWrapper>
  );
};

const AppMenuWrapper = styled.div`
  @media (max-width: 592px) {
    display: none;
  }
`;

const MenuStyled = styled(
  Menu as React.ComponentType<React.ComponentProps<typeof Menu>>
)`
  background-color: inherit;
  border-bottom: none;
  margin-left: 4px;

  .ant-menu-item {
    color: white;
  }
`;
