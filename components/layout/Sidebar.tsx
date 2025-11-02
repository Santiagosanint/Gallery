import React from 'react';
import { ArrowLeftIcon, ThemeIcon, GearIcon } from '../../constants';

interface Category {
  name: string;
  count: number;
  isNew?: boolean;
  isTop?: boolean;
}

interface CategorySection {
  title: string;
  icon?: React.FC<{ className?: string }>;
  categories: Category[];
}

interface SidebarProps {
  categorySections: CategorySection[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categorySections, activeCategory, onSelectCategory, isAdminMode, onToggleAdminMode }) => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-800 bg-black flex flex-col">
      <div className="p-4">
        <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Components</span>
        </a>
      </div>
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-4">
          {categorySections.map((section) => (
            <li key={section.title}>
              <h2 className="font-semibold text-white py-2 flex items-center gap-2 text-sm px-2">
                {section.icon && <section.icon className="h-4 w-4 text-gray-400" />}
                {section.title}
              </h2>
              <ul>
                {section.categories.map(({ name, count, isNew, isTop }) => {
                  const isActive = name === activeCategory;
                  return (
                    <li key={name}>
                      <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onSelectCategory(name);
                        }}
                        className={`flex justify-between items-center py-1.5 px-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'bg-gray-800 text-white' 
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {name}
                           {isTop && (
                            <span className="bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                              Top
                            </span>
                          )}
                          {isNew && (
                            <span className="bg-lime-300 text-lime-900 text-xs font-bold px-1.5 py-0.5 rounded-md">
                              New
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-gray-500">{count}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <button className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 transition-colors w-full mr-2">
            Log in
          </button>
           <button onClick={onToggleAdminMode} className={`p-2 rounded-md transition-colors ${isAdminMode ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}>
            <GearIcon className={`h-5 w-5 ${isAdminMode ? 'text-white' : 'text-gray-400'}`} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-800 transition-colors">
            <ThemeIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </aside>
  );
};