
import React, { useState, useEffect } from 'react';
import type { ComponentData } from '../types';
import { ExternalLinkIcon, FullscreenIcon } from '../constants';

interface ComponentDetailPageProps {
  component: ComponentData;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  isAdminMode: boolean;
  onUpdateComponent: (updatedData: Partial<ComponentData>) => void;
}

const ChevronLeftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
);

export const ComponentDetailPage: React.FC<ComponentDetailPageProps> = ({ component, onBack, onNext, onPrevious, isFirst, isLast, isAdminMode, onUpdateComponent }) => {
  const [imageUrl, setImageUrl] = useState(component.previewImageUrl || '');
  const [isIframeLoading, setIsIframeLoading] = useState(!!component.embedUrl);

  useEffect(() => {
    setImageUrl(component.previewImageUrl || '');
    setIsIframeLoading(!!component.embedUrl);
  }, [component.id, component.embedUrl, component.previewImageUrl]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleUrlSave = () => {
    onUpdateComponent({ previewImageUrl: imageUrl });
  };
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
      {/* Background */}
       <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-md" onClick={onBack}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-purple-500/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-[60vw] h-[40vh] bg-blue-500/20 blur-[100px] rounded-full"></div>
      
      {/* Navigation */}
      {!isFirst && (
        <button 
          onClick={onPrevious} 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Previous component"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
      )}
      {!isLast && (
        <button 
          onClick={onNext} 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Next component"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Modal */}
      <div className="relative w-[90vw] max-w-6xl h-[85vh] bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-white/10">
          <div>
            <p className="font-semibold text-white text-sm">{component.name}</p>
            <p className="text-xs text-gray-400">{component.author}</p>
          </div>
          {isAdminMode && (
             <div className="flex-1 px-4">
                <input
                    type="text"
                    placeholder="Paste preview image URL..."
                    value={imageUrl}
                    onChange={handleUrlChange}
                    onBlur={handleUrlSave}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-1 text-xs text-gray-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
             </div>
          )}
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 rounded-md hover:bg-white/10" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-300"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>
            </button>
          </div>
        </div>
        {/* Preview */}
        <div className="flex-1 p-2">
            <div className={`relative w-full h-full rounded-lg overflow-hidden ${component.previewBg === 'light' ? 'bg-[#F9F3EC]' : 'bg-black'}`}>
                
                {!component.embedUrl && !component.previewImageUrl && <component.component />}

                {(component.embedUrl || component.previewImageUrl) && (
                    <>
                        {component.previewImageUrl && (
                            <img src={component.previewImageUrl} alt={component.name} className="absolute inset-0 w-full h-full object-cover" />
                        )}

                        {component.embedUrl && (
                            <iframe
                                src={component.embedUrl}
                                title={component.name}
                                className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
                                sandbox="allow-scripts allow-same-origin"
                                onLoad={() => setIsIframeLoading(false)}
                            />
                        )}

                        {component.embedUrl && isIframeLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
