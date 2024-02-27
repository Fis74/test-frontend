import { FC, ReactNode } from "react";
import styles from "../styles/modules/input.module.scss";
import { getClasses } from "../utils/getClasses";

interface InputProps {
  id: string;
  value: string | number;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
}

const Input: FC<InputProps> = ({ id, value, type, placeholder, onChange, icon }) => {
  return (
    <div className={getClasses([styles.body])}>
      <input
        className={getClasses([styles.input, value && styles.value])}
        placeholder={placeholder}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
      {icon && (value || value === 0) && icon}
    </div>
  );
};

export default Input;
