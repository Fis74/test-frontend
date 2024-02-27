import { useEffect, useState } from "react";
import { setActiveFilter, setFilterByProduct } from "../store/reducers/filters.slice";
import { useDebounce } from "../hooks/useDebounce";
import { useAppDispatch } from "../hooks/hooks";
import Input from "./Input";
import { getClasses } from "../utils/getClasses";
import styles from "../styles/modules/search.module.scss";
import { MdClose } from "react-icons/md";

const Search = () => {
  const dispatch = useAppDispatch();
  const [productValue, setProductValue] = useState<string | null>("");
  const { debouncedValue } = useDebounce(productValue!, 250);
  useEffect(() => {
    if (debouncedValue !== "") {
      dispatch(setActiveFilter(true));
      dispatch(setFilterByProduct(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  const handleClose = () => {
    dispatch(setActiveFilter(false));
    dispatch(setFilterByProduct(""));
    setProductValue("");
  };
  return (
    <div className={getClasses([styles.search])}>
      <Input
        placeholder="Поиск по товарам"
        type="text"
        id="search"
        value={productValue ? productValue : ""}
        onChange={(e) => setProductValue(e.target.value)}
        icon={<MdClose onClick={handleClose} className={getClasses([styles.icon])} />}
      />
    </div>
  );
};

export default Search;
