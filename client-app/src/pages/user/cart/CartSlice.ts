import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ICartState } from "../../../constant/cart/cart";

const initialState: ICartState = {
  itemsList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => {
      return initialState;
    },
    setItems: (state, action) => {
      state = action.payload;
    },

    addToCart: (state, action) => {
      console.log(action.payload);
      if (state.itemsList.find((card) => card.id === action.payload.id)) {
        state.itemsList = state.itemsList.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity++;
          }
          return item;
        });
      } else {
        state.itemsList = [...state.itemsList, action.payload];
      }
    },

    removeFromCart: (state, action) => {
      state.itemsList = state.itemsList.filter((item) => item.id !== action.payload);
    },

    increaseCount: (state, action) => {
      state.itemsList = state.itemsList.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.itemsList = state.itemsList.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          item.quantity--;
        }
        return item;
      });
    },
  },
});

export const { setItems, addToCart, decreaseCount, increaseCount, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
