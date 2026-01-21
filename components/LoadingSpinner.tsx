
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-slate-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium">AI is generating your material...</p>
      <p className="text-sm text-slate-500">This might take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
