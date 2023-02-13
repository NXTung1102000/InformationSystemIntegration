import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ICartState } from "../../../constant/cart/cart";
export {};

const initialState: ICartState = {
  itemsList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state = action.payload;
    },

    addToCart: (state, action) => {
      state.itemsList = [...state.itemsList, action.payload.item];
    },

    removeFromCart: (state, action) => {
      state.itemsList = state.itemsList.filter((item) => item.id !== action.payload.id);
    },

    increaseCount: (state, action) => {
      state.itemsList = state.itemsList.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.itemsList = state.itemsList.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1) {
          item.quantity--;
        }
        return item;
      });
    },
  },
});

export const { setItems, addToCart, decreaseCount, increaseCount, removeFromCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
