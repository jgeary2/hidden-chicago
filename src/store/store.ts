import { configureStore } from '@reduxjs/toolkit';
import { MapFilters, mapFiltersSlice } from '../features/mapFilters/mapFiltersSlice';

export type MapStore = {
  mapFilters: MapFilters;
};

export default configureStore({
  reducer: {
    mapFilters: mapFiltersSlice.reducer
  }
});
