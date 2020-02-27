/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import './Message.css';
import classNames from 'classnames';

export const Message: FC<{ className?: string; text: string }> = observer(
  ({ className, text }) => {
    return <span className={classNames('Message', className)}>{text}</span>;
  }
);
