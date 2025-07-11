import { render } from '../../common/test-utils';
import { FilterGroupHeader } from './FilterGroupHeader';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe('FilterGroupHeader.tsx', () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockImplementation(() => mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      parentKey: {
        showGroup: false
      }
    });
  });

  it('should render the checkbox unchecked', () => {
    render(<FilterGroupHeader filterParentKey={'parentKey'} />);

    expect(screen.getByText('Parent Key')).toBeInTheDocument();
    expect(screen.getByTestId('filter-group-header-parentKey')).not.toBeChecked();
  });

  it('should render the checkbox checked', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      parentKey: {
        showGroup: true
      }
    });

    render(<FilterGroupHeader filterParentKey={'parentKey'} />);

    expect(screen.getByText('Parent Key')).toBeInTheDocument();
    expect(screen.getByTestId('filter-group-header-parentKey')).toBeChecked();
  });

  it('should click the checkbox and dispatch the value change', async () => {
    render(<FilterGroupHeader filterParentKey={'parentKey'} />);

    userEvent.click(await screen.findByTestId('filter-group-header-parentKey'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        parentKey: {
          showGroup: true
        }
      },
      type: 'mapFilters/setFilters'
    });
  });
});
