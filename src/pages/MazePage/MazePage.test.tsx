import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';

describe('MazePage', () => {
  it('renders', async () => {
    render(<TestApp route="/maze" />);
    expect(await screen.findByTestId('MazePage')).toBeInTheDocument();
  });
});
