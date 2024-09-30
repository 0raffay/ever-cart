import { createSlice } from "@reduxjs/toolkit";

const adminAddProductSlice = createSlice({
  name: "adminAddProductSlice",
  initialState: {
    productImg: [],
    formFields: {},
    showSidebar: false,
  },
  reducers: {
    setProductImg: (state, action) => {
      state.productImg = [...state.productImg, action.payload];
    },
    setFormFields: (state, action) => {
      const payload = action.payload;
      state.formFields = { ...payload };
    },
    setResetAdminActionState: (state) => {
      state.productImg = [];
      state.formFields = {};
    },
    setShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar; // Toggle between true and false
    },
  },
});

// Corrected selectors
export const selectFormFields = (state) => state.adminProductSliceState.formFields;
export const selectProductImages = (state) => state.adminProductSliceState.productImg;
export const selectShowSidebar = (state) => state.adminProductSliceState.showSidebar;

export const {
  setProductImg,
  setFormFields,
  setResetAdminActionState,
  setShowSidebar,
} = adminAddProductSlice.actions;

export default adminAddProductSlice.reducer;
