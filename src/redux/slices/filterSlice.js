import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
  sort: 0,
  currentPage: 1,
  order: 'asc',
  sortTypes: []
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId (state, action) {
      state.categoryId = action.payload;
    },
    setSort (state, action) {
      state.sort = action.payload;
    },
    setCurrentPage (state, action) {
      state.currentPage = action.payload;
    },
    setSortTypes (state, action) {
      state.sortTypes = action.payload;
    },
    setFilters (state, action) {
      state.sort = action.payload.sortBy;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.category);
      state.order = action.payload.order;
    }
  }
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSortTypes } = filterSlice.actions;

export default filterSlice.reducer;
