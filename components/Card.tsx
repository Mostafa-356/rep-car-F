
import React from 'react';
import { cx, styles } from '../styles';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cx(styles.card, className)}>
      {children}
    </div>
  );
};

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
    return <div className={cx(styles.cardContent, className)}>{children}</div>
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
    return <div className={cx(styles.cardHeader, className)}>{children}</div>
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}
export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
    return <h3 className={cx(styles.cardTitle, className)}>{children}</h3>
}

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}
export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
    return <p className={cx(styles.cardDescription, className)}>{children}</p>
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}
export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
    return <div className={cx('flex items-center px-6 pb-6 sm:px-7 sm:pb-7', className)}>{children}</div>
}


export default Card;
