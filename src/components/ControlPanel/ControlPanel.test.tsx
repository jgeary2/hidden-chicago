import React from 'react';
import { ControlPanel } from './ControlPanel';
import { render } from '../../common/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

jest.mock('../../common/utils', () => ({
  ...jest.requireActual('../../common/utils'),
  getClearedFilters: () => 'clearedFilters'
}));

describe('ControlPanel.tsx', () => {
  it('should render the control panel', async () => {
    render(<ControlPanel />);

    expect(await screen.findByTestId('control-panel')).toBeInTheDocument();
  });

  it('should dispatch reset filters on reset button press', async () => {
    render(<ControlPanel />);

    userEvent.click(await screen.findByTestId('button-reset'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: undefined,
      type: 'mapFilters/resetFilters'
    });
  });

  it('should dispatch filter update with correct filters on clear all button press', async () => {
    render(<ControlPanel />);

    userEvent.click(await screen.findByTestId('button-clear-all'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 'clearedFilters',
      type: 'mapFilters/setFilters'
    });
  });
});
