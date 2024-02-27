import { createSlice } from "@reduxjs/toolkit";
import { Field } from "../../types/types";

interface Selected {
  key: Field;
  value: string | number;
}

interface FiltersState {
  brand: string;
  product: string;
  price: number;
  selected: Selected[];
  activeFilter: boolean;
}

const initialState: FiltersState = {
  brand: "",
  product: "",
  price: -1,
  selected: [],
  activeFilter: false,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFiterByBrand: (state, action) => {
      if (state.activeFilter) {
        state.brand = action.payload;
        state.selected.push({ key: Field.brand, value: action.payload });
      } else {
        state.brand = action.payload;
        state.selected = state.selected.filter((item) => item.key !== Field.brand);
      }
    },
    setFilterByProduct: (state, action) => {
      if (state.activeFilter) {
        state.product = action.payload;
        state.selected.push({ key: Field.product, value: action.payload });
      } else {
        state.product = action.payload;
        state.selected = state.selected.filter((item) => item.key !== Field.product);
      }
    },
    setFilterByPrice: (state, action) => {
      if (state.activeFilter) {
        state.price = action.payload;
        state.selected.push({ key: Field.price, value: action.payload });
      } else {
        state.price = action.payload;
        state.selected = state.selected.filter((item) => item.key !== Field.price);
      }
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { setFiterByBrand, setFilterByProduct, setFilterByPrice, setActiveFilter } =
  filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
