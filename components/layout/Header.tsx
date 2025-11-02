
import React from 'react';
import { SearchIcon, ChevronDownIcon } from '../../constants';

interface HeaderProps {
    category: string;
}

export const Header: React.FC<HeaderProps> = ({ category }) => {
  return (
    <header className="flex items-center justify-between h-16 px-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tighter">Santiago Sanint</span>
        </div>
        <div className="h-6 w-px bg-gray-700"></div>
        <div className="flex items-center gap-2 text-gray-400">
            <span>Components</span>
            <span>/</span>
            <span className="text-white">{category}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 border border-gray-700 rounded-md pl-9 pr-3 py-1.5 text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm hover:bg-gray-700 transition-colors">
          <span>Recommended</span>
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};