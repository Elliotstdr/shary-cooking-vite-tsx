import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// shopping reducer
const initialState: ShoppingState = {
  lists: [],
  defaultProduct: [],
  selectedList: null
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
    updateSelectedList: (state, action: PayloadAction<List>) => {
      return {
        ...state,
        selectedList: action.payload
      };
    },
    initSelectedList: (state) => {
      return {
        ...state,
        selectedList: state.lists[0] || null
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

export const {
  updateShopping,
  updateSelectedList,
  initSelectedList,
  removeList,
  addList,
  removeProduct,
  addProduct,
  editList
} = shoppingSlice.actions
export default shoppingSlice.reducer