import React from 'react';
import type { ComponentData } from '../types';
import { ComponentCard } from './ComponentCard';
import { ChevronDownIcon } from '../constants';

interface GalleryPageProps {
  components: ComponentData[];
  category: string;
  onSelectComponent: (component: ComponentData) => void;
  isLoading: boolean;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ components, category, onSelectComponent, isLoading }) => {
  if (isLoading) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-400">
          <span className="text-gray-500">Components</span> / {category}
        </div>
        <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm hover:bg-gray-700 transition-colors">
          <span>Recommended</span>
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {components.map((component) => (
          <ComponentCard key={component.id} component={component} onSelect={onSelectComponent} />
        ))}
      </div>
    </div>
  );
};
