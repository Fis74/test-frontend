import React, { FC } from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={getClasses([styles.button, disabled && styles[`button--disabled`]])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
