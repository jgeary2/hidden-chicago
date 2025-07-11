import { render } from '../../common/test-utils';
import { FilterGroupHeader } from './FilterGroupHeader';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const mockDispatch = jest.fn();
let mockShowGroup: boolean;
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => ({
    parentKey: {
      showGroup: mockShowGroup
    }
  })
}));

describe('FilterGroupHeader.tsx', () => {
  beforeEach(() => {
    mockShowGroup = false;
  });

  it('should render the checkbox unchecked', () => {
    render(<FilterGroupHeader filterParentKey={'parentKey'} />);

    expect(screen.getByText('Parent Key')).toBeInTheDocument();
    expect(screen.getByTestId('filter-group-header-parentKey')).not.toBeChecked();
  });

  it('should render the checkbox checked', () => {
    mockShowGroup = true;

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
