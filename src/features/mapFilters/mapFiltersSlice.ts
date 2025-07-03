import { createSlice } from '@reduxjs/toolkit';

interface BaseFilter extends Record<string, any> {
  showGroup: boolean;
}

export type MapFilters = {
  neighborhoods: BaseFilter;
  beaches: BaseFilter;
  tiedHouses: BaseFilter;
  murals: BaseFilter;
  parks: BaseFilter;
  landmarks: BaseFilter;
  chicagoSculptureExhibit: BaseFilter;
};

export const DEFAULT_MAP_FILTERS: MapFilters = {
  neighborhoods: {
    showGroup: true
  },
  beaches: {
    showGroup: false
  },
  tiedHouses: {
    showGroup: false
  },
  murals: {
    showGroup: false
  },
  parks: {
    showGroup: false
  },
  landmarks: {
    showGroup: false
  },
  chicagoSculptureExhibit: {
    showGroup: false
  }
};

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

const deepMerge = (target: any, ...sources: any[]): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return deepMerge(target, ...sources);
};

export const mapFiltersSlice = createSlice({
  name: 'mapFilters',
  initialState: DEFAULT_MAP_FILTERS,
  reducers: {
    setFilters: (state, action) => {
      return deepMerge(state, action.payload);
    },
    resetFilters: () => DEFAULT_MAP_FILTERS
  }
});

export const { setFilters, resetFilters } = mapFiltersSlice.actions;

export default mapFiltersSlice.reducer;
