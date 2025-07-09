import { configureStore } from '@reduxjs/toolkit';
import { MapFilters, mapFiltersSlice } from '../features/mapFilters/mapFiltersSlice';
import { SelectionData, selectionDataSlice } from '../features/selectionData/selectionDataSlice';

export type MapStore = {
  mapFilters: MapFilters;
  selectionData: SelectionData;
};

export default configureStore({
  reducer: {
    mapFilters: mapFiltersSlice.reducer,
    selectionData: selectionDataSlice.reducer
  }
});
