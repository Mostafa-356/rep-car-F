import React from 'react';
import { styles } from '../styles';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description }) => (
  <header className={styles.pageHeader}>
    <span className={styles.pageEyebrow}>{eyebrow}</span>
    <h1 className={styles.pageTitle}>{title}</h1>
    <p className={styles.pageDescription}>{description}</p>
  </header>
);

export default PageHeader;