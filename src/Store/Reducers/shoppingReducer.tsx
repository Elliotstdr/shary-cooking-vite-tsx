import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// shopping reducer
const initialState: ShoppingState = {
  lists: [],
  defaultProduct: []
}

export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    updateShopping: (state, action: PayloadAction<Partial<ShoppingState>>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    removeList: (state, action: PayloadAction<List>) => {
      return {
        ...state,
        lists: [...state.lists].filter((x) => x.id !== action.payload.id),
      };
    },
    addList: (state, action: PayloadAction<List>) => {
      return {
        ...state,
        lists: [action.payload, ...state.lists]
      };
    },
    editList: (state, action: PayloadAction<List>) => {
      return {
        ...state,
        lists: [...state.lists].map((x) => {
          if (x.id === action.payload.id)
            return action.payload
          else
            return x
        })
      };
    },
    removeProduct: (state, action: PayloadAction<DefaultProduct>) => {
      return {
        ...state,
        defaultProduct: [...state.defaultProduct].filter((x) => x.id !== action.payload.id),
      };
    },
    addProduct: (state, action: PayloadAction<DefaultProduct>) => {
      return {
        ...state,
        defaultProduct: [...state.defaultProduct, action.payload],
      };
    }
  },
})

export const { updateShopping, removeList, addList, removeProduct, addProduct, editList } = shoppingSlice.actions
export default shoppingSlice.reducer