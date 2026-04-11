import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';

describe('WayfindingPage', () => {
  it('renders', async () => {
    render(<TestApp route="/way-finding" />);
    expect(await screen.findByTestId('WayfindingPage')).toBeInTheDocument();
  });
});
