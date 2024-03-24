import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SecondaryState = {
  types: null,
  units: null,
  regimes: null,
  ingTypes: null,
  ingData: null,
};

export const secondaryTablesSlice = createSlice({
  name: 'secondaryTables',
  initialState,
  reducers: {
    updateSecondaryTables: (state, action: PayloadAction<Partial<SecondaryState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
})

export const { updateSecondaryTables } = secondaryTablesSlice.actions
export default secondaryTablesSlice.reducer;
