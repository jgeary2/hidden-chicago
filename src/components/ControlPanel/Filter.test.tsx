import { render } from '../../common/test-utils';
import { Filter, FilterType } from './Filter';
import { screen } from '@testing-library/react';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({
    parentKey: {
      title: ''
    }
  })
}));

describe('Filter.tsx', () => {
  it('should render a dropdown', () => {
    const filter: FilterType = {
      field: 'title',
      label: 'Title',
      type: 'string',
      options: ['option1', 'option2']
    };

    render(<Filter filter={filter} filterParentKey={'parentKey'} />);

    expect(screen.getByTestId('filter-dropdown-title')).toBeTruthy();
  });

  it('should render a checkbox', () => {
    const filter: FilterType = {
      field: 'isActive',
      label: 'Is Active',
      type: 'boolean'
    };

    render(<Filter filter={filter} filterParentKey={'parentKey'} />);

    expect(screen.getByTestId('filter-checkbox-isActive')).toBeTruthy();
  });
});
