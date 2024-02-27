import { configureStore } from "@reduxjs/toolkit";
import { paginationReducer } from "./reducers/pagination.slice";
import { filtersReducer } from "./reducers/filters.slice";
import { Api } from "../services/Api";

export const store = configureStore({
  reducer: {
    paginationReducer,
    filtersReducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(Api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
