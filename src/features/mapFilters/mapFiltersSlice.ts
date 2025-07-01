import { createSlice } from '@reduxjs/toolkit';

type BaseFilter = {
  showGroup: boolean;
};

interface TiedHouseFilter extends BaseFilter {
  brewery: string;
  hasLogo: boolean;
}

interface MuralFilter extends BaseFilter {
  artist: string;
  ward: string;
  yearInstalled: string;
  media: string;
}

interface ChicagoSculptureExhibitFilter extends BaseFilter {
  sponsor: string;
  yearsExhibited: string;
}

interface NeighborhoodFilter extends BaseFilter {}

interface LandmarkFilter extends BaseFilter {
  architect: string;
  landmarkYear: string;
}

export type MapFilter =
  | TiedHouseFilter
  | MuralFilter
  | ChicagoSculptureExhibitFilter
  | NeighborhoodFilter
  | LandmarkFilter;

export type MapFilters = {
  neighborhoods: NeighborhoodFilter;
  tiedHouses: TiedHouseFilter;
  murals: MuralFilter;
  chicagoSculptureExhibit: ChicagoSculptureExhibitFilter;
  landmarks: LandmarkFilter;
};

export const DEFAULT_MAP_FILTERS: MapFilters = {
  neighborhoods: {
    showGroup: true
  },
  tiedHouses: {
    brewery: '',
    hasLogo: false,
    showGroup: true
  },
  murals: {
    artist: '',
    ward: '',
    yearInstalled: '',
    media: '',
    showGroup: false
  },
  chicagoSculptureExhibit: {
    sponsor: '',
    yearsExhibited: '',
    showGroup: true
  },
  landmarks: {
    architect: '',
    landmarkYear: '',
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
    resetFilters: (state) => DEFAULT_MAP_FILTERS
  }
});

export const { setFilters, resetFilters } = mapFiltersSlice.actions;

export default mapFiltersSlice.reducer;
