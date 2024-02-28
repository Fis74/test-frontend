import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { backPage, nextPage } from "../store/reducers/pagination.slice";
import { Action, Items } from "../types/types";
import Button from "./Button";
import { getClasses } from "../utils/getClasses";
import styles from "../styles/modules/productPagination.module.scss";

interface ProductPagination {
  isLoading: boolean;
  data?: Items[];
  isError: boolean;
  filteredData?: Items[];
}

const ProductPagination: FC<ProductPagination> = ({ isLoading, data, filteredData }) => {
  const dispatсh = useAppDispatch();
  const { limit, page, action } = useAppSelector((state) => state.paginationReducer);
  const handleBack = () => {
    dispatсh(backPage());
  };

  const handleNext = () => {
    dispatсh(nextPage());
  };

  return (
    <div className={getClasses([styles.inner])}>
      {filteredData?.length && data?.length ? (
        <>
          <Button disabled={isLoading || page === 1} onClick={handleBack}>
            Предыдущая страница
          </Button>
          <p>{page}</p>
          <Button
            disabled={
              isLoading ||
              (filteredData && filteredData?.length < limit) ||
              (action === Action.filter && data?.length < limit * page)
            }
            onClick={handleNext}
          >
            Следующая страница
          </Button>
        </>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default ProductPagination;
