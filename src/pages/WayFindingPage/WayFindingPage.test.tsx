import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';

describe('WayfindingPage', () => {
  it('renders', () => {
    render(<TestApp route="/way-finding" />);
    expect(screen.getByTestId('WayfindingPage')).toBeInTheDocument();
  });
});
