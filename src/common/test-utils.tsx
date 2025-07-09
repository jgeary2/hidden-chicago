import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { DEFAULT_MAP_FILTERS } from '../features/mapFilters/mapFiltersSlice';
import { DEFAULT_SELECTION_DATA } from '../features/selectionData/selectionDataSlice';

// @ts-ignore
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    };
  };

const mockStore = configureMockStore();
const store = mockStore({
  mapFilters: DEFAULT_MAP_FILTERS,
  selectionData: DEFAULT_SELECTION_DATA
});

const MockProviders = ({ children }) => <Provider store={store}>{children}</Provider>;

const customRender = (ui, options?) => render(ui, { wrapper: MockProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
