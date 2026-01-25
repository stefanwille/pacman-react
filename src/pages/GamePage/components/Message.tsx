import React, { FC } from 'react';
import styled from 'styled-components/macro';

export const Message: FC<{ className?: string; text: string }> = ({ className, text }) => {
  return <MessageStyled className={className}>{text}</MessageStyled>;
};

const MessageStyled = styled.span`
  font-family: Joystix;
  font-size: 24px;
  color: yellow;
  position: absolute;
  left: 170px;
  top: 332px;
  width: 220px;
  text-align: center;
`;
