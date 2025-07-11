import { render } from '../../common/test-utils';
import { FilterDropdown } from './FilterDropdown';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterType } from './Filter';
import userEvent from '@testing-library/user-event';

const mockDispatch = jest.fn();
let mockTitle: string;
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => ({
    parentKey: {
      title: mockTitle
    }
  })
}));

describe('FilterDropdown.tsx', () => {
  beforeEach(() => {
    mockTitle = '';
  });

  it('should render the dropdown with no value', () => {
    const filter: FilterType = {
      field: 'title',
      label: 'Title',
      type: 'string',
      options: ['The Title', 'Other Title']
    };

    render(<FilterDropdown filter={filter} filterParentKey={'parentKey'} />);

    expect(screen.getByText('Select Title')).toBeInTheDocument();
  });

  it('should render the dropdown with no value for number options', () => {
    const filter: FilterType = {
      field: 'title',
      label: 'Title',
      type: 'string',
      options: ['1', '4']
    };

    render(<FilterDropdown filter={filter} filterParentKey={'parentKey'} />);

    expect(screen.getByText('Select Title')).toBeInTheDocument();
  });

  it('should render the dropdown with a value pre-selected', () => {
    mockTitle = 'The Title';

    const filter: FilterType = {
      field: 'title',
      label: 'Title',
      type: 'string',
      options: ['The Title', 'Other Title']
    };

    render(<FilterDropdown filter={filter} filterParentKey={'parentKey'} />);

    expect(screen.getByText('The Title')).toBeInTheDocument();
  });

  it('should filter the dropdown, select an option, and dispatch the filter change', async () => {
    const filter: FilterType = {
      field: 'title',
      label: 'Title',
      type: 'string',
      options: ['The Title', 'Other Title']
    };

    render(<FilterDropdown filter={filter} filterParentKey={'parentKey'} />);

    userEvent.click(await screen.findByText('Select Title'));

    expect(screen.getByText('The Title')).toBeInTheDocument();
    expect(screen.getByText('Other Title')).toBeInTheDocument();

    userEvent.type(await screen.findByTestId('filter-dropdown-search-title'), 'Other Title');

    expect(screen.queryByText('The Title')).not.toBeInTheDocument();
    expect(screen.getByText('Other Title')).toBeInTheDocument();

    userEvent.click(await screen.findByText('Other Title'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        parentKey: {
          title: 'Other Title'
        }
      },
      type: 'mapFilters/setFilters'
    });
  });
});
