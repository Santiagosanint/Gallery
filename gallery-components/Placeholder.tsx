import React from 'react';

interface PlaceholderProps {
  name?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ name }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent p-2">
      <div className="text-center text-gray-500 border-2 border-dashed border-gray-800 rounded-lg w-full h-full flex items-center justify-center flex-col hover:border-gray-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="font-medium text-sm text-gray-400">{name}</p>
        <p className="text-xs mt-1 text-gray-600">Awaiting Implementation</p>
      </div>
    </div>
  );
};
