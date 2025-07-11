import { render } from '../../common/test-utils';
import { FilterCheckbox } from './FilterCheckbox';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType } from './Filter';
import userEvent from '@testing-library/user-event';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe('FilterCheckbox.tsx', () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockImplementation(() => mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      parentKey: {
        isActive: false
      }
    });
  });

  it('should render the checkbox unchecked', () => {
    const filter: FilterType = {
      field: 'isActive',
      label: 'Is Active',
      type: 'boolean'
    };

    render(<FilterCheckbox filter={filter} filterParentKey={'parentKey'} />);

    expect(screen.getByTestId('filter-checkbox-isActive')).not.toBeChecked();
  });

  it('should render the checkbox checked', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      parentKey: {
        isActive: true
      }
    });

    const filter: FilterType = {
      field: 'isActive',
      label: 'Is Active',
      type: 'boolean'
    };

    render(<FilterCheckbox filter={filter} filterParentKey={'parentKey'} />);

    expect(screen.getByTestId('filter-checkbox-isActive')).toBeChecked();
  });

  it('should click the checkbox and dispatch the value change', async () => {
    const filter: FilterType = {
      field: 'isActive',
      label: 'Is Active',
      type: 'boolean'
    };

    render(<FilterCheckbox filter={filter} filterParentKey={'parentKey'} />);

    userEvent.click(await screen.findByTestId('filter-checkbox-isActive'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        parentKey: {
          isActive: true
        }
      },
      type: 'mapFilters/setFilters'
    });
  });
});
