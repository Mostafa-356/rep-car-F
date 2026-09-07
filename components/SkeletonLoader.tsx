
import React from 'react';
import { cx } from '../styles';

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cx('animate-pulse rounded-xl bg-muted', className)} />
  );
};

export default SkeletonLoader;
