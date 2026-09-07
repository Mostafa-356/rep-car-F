
import React from 'react';
import { cx, styles } from '../styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const variantClasses = {
    primary: styles.button.primary,
    secondary: styles.button.secondary,
    destructive: styles.button.destructive,
  };

  return (
    <button className={cx(styles.button.base, variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
