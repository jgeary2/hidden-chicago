import React from 'react';
import { ControlPanel } from './ControlPanel';
import { render } from '../../common/test-utils';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import { getClearedFilters } from '../../common/utils';
import { screen } from '@testing-library/react';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

jest.mock('../../common/utils', () => ({
  ...jest.requireActual('../../common/utils'),
  getClearedFilters: jest.fn()
}));

describe('ControlPanel.tsx', () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockImplementation(() => mockDispatch);
    (getClearedFilters as jest.Mock).mockImplementation(() => 'clearedFilters');
  });

  it('should render the control panel', () => {
    render(<ControlPanel />);

    expect(screen.getByTestId('control-panel')).not.toBeNull();
  });

  it('should dispatch reset filters on reset button press', () => {
    render(<ControlPanel />);

    userEvent.click(screen.getByTestId('button-reset'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: undefined,
      type: 'mapFilters/resetFilters'
    });
  });

  it('should dispatch filter update with correct filters on clear all button press', () => {
    render(<ControlPanel />);

    userEvent.click(screen.getByTestId('button-clear-all'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 'clearedFilters',
      type: 'mapFilters/setFilters'
    });
  });
});
