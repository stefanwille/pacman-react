import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';

describe('MazePage', () => {
  it('renders', () => {
    render(<TestApp route="/" />);
    expect(screen.getByTestId('GamePage')).toBeInTheDocument();
  });
});
