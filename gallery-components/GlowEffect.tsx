
import React from 'react';

export const GlowEffect: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F9F3EC]">
      <div className="relative">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative px-16 py-10 bg-white ring-1 ring-gray-900/5 rounded-xl leading-none flex items-top justify-start space-x-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};