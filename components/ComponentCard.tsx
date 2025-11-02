
import React, { useState } from 'react';
import type { ComponentData } from '../types';

interface ComponentCardProps {
  component: ComponentData;
  onSelect: (component: ComponentData) => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component, onSelect }) => {
  const { name, author, variant } = component;
  const [isHovered, setIsHovered] = useState(false);

  const Preview = () => {
    if (component.component) {
      return <component.component />;
    }
    if (component.previewImageUrl) {
      return <img src={component.previewImageUrl} alt={name} className="w-full h-full object-cover" loading="lazy" />;
    }
    if (component.embedUrl) {
      return (
        <iframe
          src={component.embedUrl}
          title={name}
          className="w-full h-full border-0 pointer-events-none"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          scrolling="no"
        />
      );
    }
    // Default placeholder for components awaiting implementation
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-gray-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25a.75.75 0 01.75.75v.008l.008.008.008.008v.008l.008.008.008.008l.008.008v.008l.008.008.008.008.008.008v.008l.008.008.008.008v.008a.75.75 0 11-1.5 0v-.008l-.008-.008L12 3a.75.75 0 01.75-.75z"/>
                </svg>
                <p className="font-medium text-sm text-gray-400">{name}</p>
                <p className="text-xs mt-1 text-gray-600">Awaiting Implementation</p>
            </div>
        </div>
    );
  };

  return (
    <div 
      onClick={() => onSelect(component)} 
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className="mb-4">
        <h3 className="font-semibold text-white">{name}</h3>
        <p className="text-sm text-gray-400">{author} &middot; {variant}</p>
      </div>
      <div className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 border-dashed border-gray-800 group-hover:border-indigo-500/50 transition-all duration-300 ${component.previewBg === 'light' ? 'bg-[#F9F3EC]' : 'bg-black'}`}>
        <div className="absolute inset-0">
          {isHovered ? (
            <Preview />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-gray-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25a.75.75 0 01.75.75v.008l.008.008.008.008v.008l.008.008.008.008l.008.008v.008l.008.008.008.008.008.008v.008l.008.008.008.008v.008a.75.75 0 11-1.5 0v-.008l-.008-.008L12 3a.75.75 0 01.75-.75z" />
                    </svg>
                    <p className="font-medium text-sm text-gray-400">Hover to Preview</p>
                </div>
            </div>
          )}
        </div>
         <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};
