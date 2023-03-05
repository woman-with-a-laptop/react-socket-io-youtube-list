import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders component', () => {
    const { container } = render(<App />)
    expect(container.getElementsByClassName('app').length).toBe(1);
  });
});
