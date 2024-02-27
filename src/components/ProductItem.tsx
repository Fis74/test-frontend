import { FC } from "react";
import { Items } from "../types/types";
import styles from "../styles/modules/productItem.module.scss";
import { getClasses } from "../utils/getClasses";

interface ProductItemProps {
  product: Items;
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <article className={getClasses([styles.inner])}>
      <h2>{product.product}</h2>
      <div className={getClasses([styles.description])}>
        <span>{product.id}</span>
        <span>{product.brand ? product.brand : "Нет бренда"}</span>
        <span>{product.price} ₽</span>
      </div>
    </article>
  );
};
