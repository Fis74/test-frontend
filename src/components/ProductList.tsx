import { useEffect, useState } from "react";
import { useGetProductMutation } from "../services/Api";
import { ProductItem } from "../components/ProductItem";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Action, Data, Field, Items } from "../types/types";
import ProductPagination from "./ProductPagination";
import styles from "../styles/modules/productList.module.scss";
import { getClasses } from "../utils/getClasses";
import Button from "./Button";
import { setFilterAction } from "../store/reducers/pagination.slice";

const ProductList = () => {
  const { offset, limit, action, page } = useAppSelector((state) => state.paginationReducer);
  const { brand, product, price, selected } = useAppSelector((state) => state.filtersReducer);
  const [getData, { isLoading, data, isError, isUninitialized }] = useGetProductMutation();
  const [filteredData, setFilteredData] = useState<Items[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selected.length >= 1) {
      dispatch(setFilterAction(Action.filter));
    }
    if (selected.length === 0 && Action.filter) {
      dispatch(setFilterAction(Action.get_ids));
    }
  }, [selected]);

  useEffect(() => {
    if (data) {
      const filteredItems = data.slice((page - 1) * limit, page * limit);
      setFilteredData(filteredItems);
    }
  }, [limit, page]);

  useEffect(() => {
    setFilteredData(data);
    if (data && selected.length === 1) {
      const filteredItems = data.slice(0, limit);
      setFilteredData(filteredItems);
    }
    if (data && selected.length > 1) {
      const filter = data.filter((item) => {
        if (selected[selected.length - 1].key === Field.brand) {
          return item.brand?.includes(String(selected[selected.length - 1].value));
        }
        if (selected[selected.length - 1].key === Field.product) {
          return item.product?.includes(String(selected[selected.length - 1].value));
        }
        if (selected[selected.length - 1].key === Field.price) {
          return item.price === selected[selected.length - 1].value;
        }
      });
      const filteredItems = filter.slice(0, limit);
      setFilteredData(filteredItems);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [offset, limit, action, price, product, brand]);

  const fetchData = () => {
    const obj = {
      action: action,
      params: {},
    } as Data;
    if (action === Action.filter) {
      if (product !== "") {
        obj.params.product = product;
      } else if (brand !== "") {
        obj.params.brand = brand !== "noBrand" ? brand : null;
      } else if (price > 0) {
        obj.params.price = price;
      }
    }
    if (action === Action.get_ids) {
      obj.params.offset = offset;
      obj.params.limit = limit;
    }
    getData(obj);
  };
  return (
    <section className={getClasses([styles.product])}>
      <div className={getClasses([styles.inner])}>
        {isError ? (
          <div className={getClasses([styles.error])}>
            <span>Ошибка при запросе</span>
            <Button onClick={fetchData}>Повторить</Button>
          </div>
        ) : isLoading || isUninitialized ? (
          <span className="loader"></span>
        ) : filteredData?.length ? (
          filteredData?.map((product) => <ProductItem key={product.id} product={product} />)
        ) : (
          <span>Товара нет</span>
        )}
      </div>
      <ProductPagination
        isError={isError}
        isLoading={isLoading}
        data={data}
        filteredData={filteredData}
      />
    </section>
  );
};

export default ProductList;
