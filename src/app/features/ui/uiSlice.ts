import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  [key: string]: number | null;
}

const initialState: UiState = {
  showLoader: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openItem(state, action: PayloadAction<{ key: string; index: number }>) {
      state[action.payload.key] = action.payload.index;
    },
    closeItem(state, action: PayloadAction<string>) {
      state[action.payload] = null;
    },
    toggleItem(state, action: PayloadAction<{ key: string; index: number }>) {
      const { key, index } = action.payload;
      state[key] = state[key] === index ? null : index;
    },
    handleShowLoader: (state) => {
      state.showLoader = true;
    },
    handleHideLoader: (state) => {
      state.showLoader = false;
    },
  },
});

export const {
  openItem,
  closeItem,
  toggleItem,
  handleShowLoader,
  handleHideLoader,
} = uiSlice.actions;

export const selectOpenItem = (key: string) => (state: RootState) =>
  state.ui?.[key];

export const selectShowLoader = (state: RootState) => state.ui.showLoader;

export default uiSlice.reducer;
