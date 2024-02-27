import { FC } from "react";
import styles from "../styles/modules/brand.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdCheck } from "react-icons/md";

interface BrandProps {
  filterBrand: string | null;
  brand: string | null;
  changeBrand: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Brand: FC<BrandProps> = ({ filterBrand, changeBrand, brand }) => {
  return (
    <label className={getClasses([styles.label])}>
      <input
        type="checkbox"
        id={filterBrand ? filterBrand : "noBrand"}
        name={filterBrand ? filterBrand : "noBrand"}
        value={filterBrand ? filterBrand : "noBrand"}
        onChange={changeBrand}
        checked={filterBrand === brand || (brand === "noBrand" && filterBrand === null)}
      />
      <MdCheck className={getClasses([styles.icon])} />
      <span className={getClasses([styles.custom])}>
        {filterBrand ? filterBrand : "Нет бренда"}
      </span>
    </label>
  );
};

export default Brand;
