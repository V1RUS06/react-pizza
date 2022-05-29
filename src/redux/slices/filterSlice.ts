import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortTypes } from "../../types";

export interface filterSlice {
  categoryId: number;
  sort: SortTypes;
}

const initialState: filterSlice = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortTypes>) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
