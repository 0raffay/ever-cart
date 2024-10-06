import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    cartQuantity: 0,
    cartTotalPrice: 0,
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
    setCartTotal: (state, action) => {
      console.log("action payload", action.payload);
      if (!action.payload) {
        return;
      }

      const cartTotalPrice = action.payload.reduce((acc, item) => {
        const subTotal = Number(item?.price) * Number(item?.quantity);
        return acc + subTotal;
      }, 0);

      state.cartTotalPrice = cartTotalPrice;
    },
  },
});

export const selectCartQuantity = (state: RootState) =>
  state.productSlice.cartQuantity;

export const selectTotalUserBill = (state: RootState) =>
  state.productSlice.cartTotalPrice;

export const {
  setAddCartQuantity,
  setDeleteCartQuantity,
  setDeleteAllQuantity,
  setCartTotal,
} = productSlice.actions;

export default productSlice.reducer;
