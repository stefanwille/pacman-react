import React from 'react';
import { render } from '@testing-library/react';
import { TestApp } from '../../test-util/TestApp';
import { Store } from '../../model/Store';

describe('GamePage', () => {
  it('renders', () => {
    const store = new Store();
    const { getByText } = render(<TestApp store={store} route="/" />);
    expect(getByText('Home')).toBeInTheDocument();
  });
});
