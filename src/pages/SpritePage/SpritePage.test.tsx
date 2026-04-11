import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';

describe('SpritesPage', () => {
  it('renders', async () => {
    render(<TestApp route="/sprites" />);
    expect(await screen.findByTestId('SpritePage')).toBeInTheDocument();
  });
});
