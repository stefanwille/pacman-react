import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';

describe('SpritesPage', () => {
  it('renders', () => {
    render(<TestApp route="/sprites" />);
    expect(screen.getByTestId('SpritePage')).toBeInTheDocument();
  });
});
