import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// search reducer
const initialState: SearchState = {
  keyword: "",
  time: null,
  type: null,
  regime: null,
  ingredient: null,
  boxFavorites: false,
  boxMine: false,
  isSearch: false
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<Partial<SearchState>>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    resetSearch: () => {
      return initialState
    }
  },
})

export const { updateSearch, resetSearch } = searchSlice.actions
export default searchSlice.reducer