import { FetchBaseQueryError, createApi, retry } from "@reduxjs/toolkit/query/react";
import {
  Action,
  Data,
  Field,
  Items,
  Result,
  ResultFields,
  ResultItems,
  ResultPrice,
} from "../types/types";

import { setCurrentPage, setPages } from "../store/reducers/pagination.slice";
import type { RootState } from "../store/store";
import { XAuth } from "../utils/crypto";
import { axiosBaseQuery } from "./axiosBase";

export const Api = createApi({
  reducerPath: "productApi",
  baseQuery: retry(
    axiosBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL,
      method: "POST",
      headers: {
        "X-Auth": XAuth,
        "Content-Type": "application/json;charset=UTF-8",
      },
    }),
    {
      maxRetries: 5,
    }
  ),
  keepUnusedDataFor: 15,
  endpoints: (build) => ({
    getBrand: build.mutation<(string | null)[], void>({
      async queryFn(_, _queryApi, _extraOptions, fetch) {
        try {
          const idsResult = await fetch({
            data: {
              action: Action.get_fields,
              params: { field: Field.brand },
            },
          });
          const typed = idsResult.data as ResultFields;
          const filtered = typed.result.filter(
            (item, index) => typed.result.indexOf(item) === index
          );
          return { data: filtered };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
    getPrice: build.mutation<number[], void>({
      async queryFn(_, _queryApi, _extraOptions, fetch) {
        try {
          const idsResult = await fetch({
            data: {
              action: Action.get_fields,
              params: { field: Field.price },
            },
          });
          const typed = idsResult.data as ResultPrice;
          const filtered = typed.result.filter(
            (item, index) => typed.result.indexOf(item) === index
          );
          return { data: filtered };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
    getProduct: build.mutation<Items[], Data>({
      async queryFn({ action, params }, _queryApi, _extraOptions, fetch) {
        const idsResult = await fetch({
          data: {
            action,
            params,
          },
        });
        if (idsResult.error) {
          return { error: idsResult.error as FetchBaseQueryError };
        }
        const dataIds = idsResult.data as Result;
        const filteredIds = new Set(dataIds.result);
        const count = dataIds.result.length - filteredIds.size;
        if (action === Action.get_ids) {
          if (count > 0) {
            const idsResult = await fetch({
              data: {
                action,
                params: {
                  offset: params.offset! + dataIds.result.length,
                  limit: count,
                },
              },
            });

            if (idsResult.error) {
              return { error: idsResult.error as FetchBaseQueryError };
            }
            const res = idsResult.data as Result;
            res.result.forEach((item) => {
              filteredIds.add(item);
            });
          }
        }
        const resultItems = await fetch({
          data: {
            action: Action.get_items,
            params: { ids: [...filteredIds] },
          },
        });
        const dataItems = resultItems.data as ResultItems;
        const filteredSet = new Set();
        const filtered = dataItems.result.filter(({ id }) => {
          return !filteredSet.has(id) && filteredSet.add(id);
        });
        if (resultItems.error) {
          return { error: resultItems.error as FetchBaseQueryError };
        }
        const { next, page } = (_queryApi.getState() as RootState).paginationReducer;
        if (action === Action.get_ids) {
          if (next) {
            _queryApi.dispatch(
              setPages({
                currentPage: page,
                offsetPage: count,
              })
            );
            _queryApi.dispatch(setCurrentPage(page));
          }
        }
        return { data: filtered };
      },
    }),
  }),
});

export const { useGetProductMutation, useGetBrandMutation, useGetPriceMutation } = Api;
