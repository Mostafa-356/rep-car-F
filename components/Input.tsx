
import React from 'react';
import { cx, styles } from '../styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={cx(styles.field, className)} {...props} />;
};

export default Input;
