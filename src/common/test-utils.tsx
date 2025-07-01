import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { DEFAULT_MAP_FILTERS } from '../features/mapFilters/mapFiltersSlice';

const mockStore = configureMockStore();
const store = mockStore({ mapFilters: DEFAULT_MAP_FILTERS });

const MockProviders = ({ children }) => <Provider store={store}>{children}</Provider>;

const customRender = (ui, options?) => render(ui, { wrapper: MockProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
