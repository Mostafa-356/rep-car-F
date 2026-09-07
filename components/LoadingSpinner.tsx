
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center" aria-label="Loading">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current/25 border-t-current"></div>
    </div>
  );
};

export default LoadingSpinner;
