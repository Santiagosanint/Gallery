
import React from 'react';

export const BackgroundPaths: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
      <svg className="absolute inset-0 w-full h-full text-gray-800/50" preserveAspectRatio="none">
        <defs>
          <pattern id="pattern-paths" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <path d="M 0 50 Q 25 25 50 50 T 100 50" stroke="currentColor" fill="none" strokeWidth="1" />
            <path d="M 0 0 Q 25 25 50 0 T 100 0" stroke="currentColor" fill="none" strokeWidth="1" />
            <path d="M 50 100 Q 75 75 100 100" stroke="currentColor" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-paths)" />
      </svg>
      <div className="relative z-10 text-center p-4">
        <h2 className="text-5xl font-bold text-white tracking-tighter">Background Paths</h2>
        <a href="#" className="mt-4 inline-block text-gray-300 border-b border-gray-500 hover:border-white transition-colors">
          Discover Excellence &raquo;
        </a>
      </div>
    </div>
  );
};