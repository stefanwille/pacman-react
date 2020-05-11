import React from 'react';
import { render } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';

describe('SpritesPage', () => {
  it('renders', () => {
    const { getByTestId } = render(<TestApp route="/sprites" />);
    expect(getByTestId('SpritePage')).toBeInTheDocument();
  });
});
