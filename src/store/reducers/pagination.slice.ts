import { createSlice } from "@reduxjs/toolkit";
import { Action } from "../../types/types";

interface currentPageOption {
  currentPage: number;
  offsetPage: number;
}

interface PaginationState {
  action: Action;
  pages: currentPageOption[];
  offset: number;
  limit: number;
  next: boolean;
  page: number;
  currentPageOption: currentPageOption;
}

const initialState: PaginationState = {
  action: Action.get_ids,
  pages: [],
  offset: 0,
  limit: 50,
  next: true,
  page: 1,
  currentPageOption: {} as currentPageOption,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPages: (state, action) => {
      state.pages.push(action.payload);
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setNext: (state, action) => {
      state.next = action.payload;
    },
    nextPage: (state) => {
      if (state.action === Action.get_ids) {
        state.next = true;
        state.offset = state.offset + state.currentPageOption.offsetPage + state.limit;
      }
      state.page += 1;
    },
    backPage: (state) => {
      if (state.action === Action.get_ids) {
        state.pages = state.pages.slice(0, state.page);
        state.page -= 1;
        state.next = false;
        state.currentPageOption = state.pages[state.page - 1];
        state.offset = state.offset - state.currentPageOption.offsetPage - state.limit;
      }
      if (state.action === Action.filter) {
        state.page -= 1;
      }
    },
    setCurrentPage: (state, action) => {
      const currentPage = state.pages.find((page) => page.currentPage == action.payload);
      if (currentPage) {
        state.currentPageOption = currentPage;
      }
    },
    setFilterAction: (state, action) => {
      state.page = 1;
      state.action = action.payload;
      state.offset = 0;
      state.pages = [];
    },
  },
});

export const {
  setPages,
  setOffset,
  setLimit,
  setNext,
  setCurrentPage,
  nextPage,
  backPage,
  setFilterAction,
} = paginationSlice.actions;

export const paginationReducer = paginationSlice.reducer;
