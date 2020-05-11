import React from 'react';
import { render } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';

describe('WayfindingPage', () => {
  it('renders', () => {
    const { getByTestId } = render(<TestApp route="/way-finding" />);
    expect(getByTestId('WayfindingPage')).toBeInTheDocument();
  });
});
