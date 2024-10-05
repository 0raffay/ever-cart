import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    cartQuantity: 0,
  },
  reducers: {
    setAddCartQuantity: (state, action) => {
      state.cartQuantity += Number(action.payload);
    },

    setDeleteCartQuantity: (state, action) => {
      if (state.cartQuantity !== 0) {
        const removedQuantity = state.cartQuantity - Number(action.payload);
        state.cartQuantity = removedQuantity;
      }
    },

    setDeleteAllQuantity: (state) => {
      state.cartQuantity = 0;
    },
  },
});

export const selectCartQuantity = (state: RootState) =>
  state.productSlice.cartQuantity;

export const {
  setAddCartQuantity,
  setDeleteCartQuantity,
  setDeleteAllQuantity,
} = productSlice.actions;

export default productSlice.reducer;
