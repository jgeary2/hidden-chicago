import React from 'react';
import { render, screen } from './common/test-utils';
import App from './App';

describe('App.tsx', () => {
  it('should render the map and control panel', () => {
    render(<App />);

    expect(screen.getByTestId('map')).not.toBeNull();
    expect(screen.getByTestId('control-panel')).not.toBeNull();
  });
})
