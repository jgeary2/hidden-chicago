import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SelectionData = {
  showDrawer: boolean;
  header: string;
  content: string;
  location: google.maps.LatLngLiteral | null;
};

export const DEFAULT_SELECTION_DATA: SelectionData = {
  showDrawer: false,
  header: '',
  content: '',
  location: null
};

export const selectionDataSlice = createSlice({
  name: 'selectionData',
  initialState: DEFAULT_SELECTION_DATA,
  reducers: {
    setShowDrawer: (state, action: PayloadAction<boolean>) => {
      state.showDrawer = action.payload;
    },
    setSelectionData: (state, action: PayloadAction<SelectionData>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    clearSelection: () => DEFAULT_SELECTION_DATA
  }
});

export const { setShowDrawer, setSelectionData, clearSelection } = selectionDataSlice.actions;

export default selectionDataSlice.reducer;
