
import React from 'react';

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`animate-pulse rounded-md bg-muted ${className}`} />
  );
};

export default SkeletonLoader;
