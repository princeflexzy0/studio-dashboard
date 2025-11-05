'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message = 'Something went wrong', onRetry }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Oops!</h3>
    <p className="text-gray-400 mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#00D9FF] text-black rounded-lg hover:bg-[#00b8d4] transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);
