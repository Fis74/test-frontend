import { useEffect, useState } from "react";
import { useGetBrandMutation, useGetPriceMutation } from "../services/Api";
import Brand from "./Brand";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  setActiveFilter,
  setFilterByPrice,
  setFiterByBrand,
} from "../store/reducers/filters.slice";
import useMinMax from "../hooks/useMinMax";
import styles from "../styles/modules/filter.module.scss";
import { getClasses } from "../utils/getClasses";
import Input from "./Input";
import { MdClose } from "react-icons/md";
import { useDebounce } from "../hooks/useDebounce";

const Filter = () => {
  const dispatch = useAppDispatch();
  const [getBrand, { data: brandData, isLoading: brandLoading, isUninitialized: isUninBrand }] =
    useGetBrandMutation();
  const [getPrice, { data: priceData, isLoading: priceLoading, isUninitialized: isUninPrice }] =
    useGetPriceMutation();
  const { brand } = useAppSelector((state) => state.filtersReducer);
  const [priceValue, setPriceValue] = useState<number>(-1);
  const [min, max] = useMinMax(priceData!);
  const { debouncedValue } = useDebounce(priceValue!, 300);

  useEffect(() => {
    getPrice();
    getBrand();
  }, []);

  useEffect(() => {
    if (debouncedValue !== -1) {
      dispatch(setActiveFilter(true));
      dispatch(setFilterByPrice(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  const changeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (brand === e.target.value) {
      dispatch(setActiveFilter(false));
      dispatch(setFiterByBrand(""));
    } else {
      dispatch(setActiveFilter(true));
      dispatch(setFiterByBrand(e.target.value));
    }
  };
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(Number(e.target.value));
  };

  const handleUp = () => {
    dispatch(setActiveFilter(false));
    dispatch(setFilterByPrice(priceValue));
  };

  const handleClose = () => {
    dispatch(setActiveFilter(false));
    setPriceValue(-1);
    dispatch(setFilterByPrice(-1));
  };

  return (
    <section className={getClasses([styles.filter])}>
      <div className={getClasses([styles.inner])}>
        <h1>Фильтры</h1>
        <fieldset className={getClasses([styles.price])}>
          <legend>Цена</legend>
          {priceLoading || isUninPrice ? (
            <span className="loader"></span>
          ) : (
            <>
              <Input
                placeholder="Поиск по цене"
                type="number"
                id="priceInput"
                value={priceValue !== -1 ? priceValue : ""}
                onChange={changePrice}
                icon={<MdClose onClick={handleClose} className={getClasses([styles.icon])} />}
              />
              <div className={getClasses([styles.info])}>
                <span>{min !== -1 ? min : ""}</span>
                <span>{max !== -1 ? max : ""}</span>
              </div>
              <input
                type="range"
                id="priceRange"
                min={min}
                max={max}
                value={priceValue}
                step={100}
                onChange={changePrice}
                onMouseUp={handleUp}
              />
            </>
          )}
        </fieldset>
        <fieldset className={getClasses([styles.brand, brandLoading && styles.hidden])}>
          <legend>Бренд</legend>
          {brandLoading || isUninBrand ? (
            <span className="loader"></span>
          ) : (
            brandData &&
            brandData?.map((filterBrand, index) => (
              <Brand
                key={index}
                filterBrand={filterBrand}
                brand={brand}
                changeBrand={changeBrand}
              />
            ))
          )}
        </fieldset>
      </div>
    </section>
  );
};

export default Filter;
