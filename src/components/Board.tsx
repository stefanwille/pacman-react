import React from 'react';
import './Board.css';
import classNames from 'classnames';

export const Board: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => (
  <div className="BoardWrapper">
    <div className={classNames('Board', className)}>{children}</div>
  </div>
);
