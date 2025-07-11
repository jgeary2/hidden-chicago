import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from './common/test-utils';
import App from './App';

describe('App.tsx', () => {
  it('should render the map and control panel', async () => {
    render(<App />);

    expect(await screen.findByTestId('map')).toBeInTheDocument();
    expect(await screen.findByTestId('control-panel')).toBeInTheDocument();
  });
});
