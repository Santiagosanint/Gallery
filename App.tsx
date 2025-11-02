
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GalleryPage } from './components/GalleryPage';
import { ComponentDetailPage } from './components/ComponentDetailPage';
import { implementedComponentsMap, categorySections } from './data/components';
import type { ComponentData } from './types';
import { Placeholder } from './gallery-components/Placeholder';
import { sanintAiLogo } from './constants';

const componentDataCache = new Map<string, ComponentData[]>();

const App: React.FC = () => {
  const [componentData, setComponentData] = useState<Record<string, ComponentData[]>>({});
  const [homeComponents, setHomeComponents] = useState<ComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Home');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategoryData = useCallback(async (category: string) => {
    if (componentDataCache.has(category)) {
      setComponentData(prev => ({...prev, [category]: componentDataCache.get(category)!}));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const categorySlug = category.toLowerCase().replace(/ \/ /g, '-').replace(/\s+/g, '-');
    
    try {
      const response = await fetch(`./data/json/${categorySlug}.json`);
      if (response.ok) {
        const fetchedComponents: Omit<ComponentData, 'component'>[] = await response.json();
        
        const mergedComponents = fetchedComponents.map((c) => ({
          ...c,
          author: 'Santiago Sanint',
          authorAvatar: sanintAiLogo,
          authorHandle: '@santiagosanint',
          component: c.componentId ? implementedComponentsMap[c.componentId] : undefined
        }));

        componentDataCache.set(category, mergedComponents);
        setComponentData(prev => ({...prev, [category]: mergedComponents}));
      } else {
         componentDataCache.set(category, []);
         setComponentData(prev => ({...prev, [category]: []}));
      }
    } catch (error) {
      console.warn(`No JSON data found for category: ${category}, will generate placeholders.`);
      componentDataCache.set(category, []);
      setComponentData(prev => ({...prev, [category]: []}));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHomeData = useCallback(async () => {
    setIsLoading(true);
    if (componentDataCache.has('home')) {
      setHomeComponents(componentDataCache.get('home')!);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`./data/json/home.json`);
      if (response.ok) {
        const fetchedComponents: Omit<ComponentData, 'component'>[] = await response.json();
        const mergedComponents = fetchedComponents.map((c) => ({
          ...c,
          author: 'Santiago Sanint',
          authorAvatar: sanintAiLogo,
          authorHandle: '@santiagosanint',
          component: c.componentId ? implementedComponentsMap[c.componentId] : undefined
        }));
        componentDataCache.set('home', mergedComponents);
        setHomeComponents(mergedComponents);
      } else {
        componentDataCache.set('home', []);
        setHomeComponents([]);
      }
    } catch (error) {
      console.error('Failed to fetch home data', error);
      componentDataCache.set('home', []);
      setHomeComponents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Home') {
      fetchHomeData();
    } else {
      fetchCategoryData(selectedCategory);
    }
  }, [selectedCategory, fetchCategoryData, fetchHomeData]);

  const displayedComponents = useMemo(() => {
    const categoryInfo = categorySections
      .flatMap(s => s.categories)
      .find(c => c.name === selectedCategory);

    const implemented = componentData[selectedCategory] || [];
    
    if (!categoryInfo) {
      return implemented;
    }

    const placeholders: ComponentData[] = [];
    const implementedCount = implemented.length;
    const totalCount = categoryInfo.count;
    const categorySlug = selectedCategory.toLowerCase().replace(/ \/ /g, '-').replace(/\s+/g, '-');

    for (let i = implementedCount; i < totalCount; i++) {
      const placeholderName = `${categoryInfo.name} #${i + 1}`;
      placeholders.push({
        id: `${categorySlug}-placeholder-${i + 1}`,
        name: placeholderName,
        category: categoryInfo.name,
        author: 'Santiago Sanint',
        authorAvatar: sanintAiLogo,
        authorHandle: '@santiagosanint',
        variant: 'Default',
        component: (props: any) => React.createElement(Placeholder, { name: placeholderName, ...props }),
        description: `This is a placeholder for the component "${placeholderName}". Implementation is pending.`,
        code: ``,
        previewBg: 'dark',
      });
    }

    return [...implemented, ...placeholders];
  }, [selectedCategory, componentData]);


  const handleSelectComponent = (component: ComponentData) => {
    setSelectedComponent(component);
  };

  const handleBackToGallery = () => {
    setSelectedComponent(null);
  };

  const handleSelectCategory = (category: string) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      setSelectedComponent(null);
    }
  };

  const toggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
  };

  const handleUpdateComponent = (updatedComponent: Partial<ComponentData>) => {
    if (!selectedComponent) return;
    const updated = { ...selectedComponent, ...updatedComponent };
    
    setSelectedComponent(updated);
    
    const currentList = selectedCategory === 'Home' ? homeComponents : displayedComponents;
    const updatedList = currentList.map(c => 
      c.id === selectedComponent.id ? updated : c
    );
    
    if (selectedCategory === 'Home') {
      componentDataCache.set('home', updatedList);
      setHomeComponents(updatedList);
    } else {
      componentDataCache.set(selectedCategory, updatedList);
      setComponentData(prev => ({...prev, [selectedCategory]: updatedList}));
    }
  };
  
  const currentComponentList = selectedCategory === 'Home' ? homeComponents : displayedComponents;
  const currentIndex = selectedComponent ? currentComponentList.findIndex(c => c.id === selectedComponent.id) : -1;

  const handleNextComponent = () => {
    if (currentIndex !== -1 && currentIndex < currentComponentList.length - 1) {
      setSelectedComponent(currentComponentList[currentIndex + 1]);
    }
  };

  const handlePreviousComponent = () => {
    if (currentIndex > 0) {
      setSelectedComponent(currentComponentList[currentIndex - 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedComponent) {
        if (event.key === 'ArrowRight') {
          handleNextComponent();
        } else if (event.key === 'ArrowLeft') {
          handlePreviousComponent();
        } else if (event.key === 'Escape') {
          handleBackToGallery();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedComponent, currentComponentList]);


  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Header category={selectedCategory} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          categorySections={categorySections} 
          activeCategory={selectedCategory} 
          onSelectCategory={handleSelectCategory}
          isAdminMode={isAdminMode}
          onToggleAdminMode={toggleAdminMode}
        />
        <main className="flex-1 overflow-y-auto bg-gray-900 relative">
          <GalleryPage 
            components={selectedCategory === 'Home' ? homeComponents : displayedComponents} 
            category={selectedCategory}
            onSelectComponent={handleSelectComponent} 
            isLoading={isLoading}
          />
          {selectedComponent && (
            <ComponentDetailPage 
              component={selectedComponent} 
              onBack={handleBackToGallery}
              onNext={handleNextComponent}
              onPrevious={handlePreviousComponent}
              isFirst={currentIndex === 0}
              isLast={currentIndex === currentComponentList.length - 1}
              isAdminMode={isAdminMode}
              onUpdateComponent={handleUpdateComponent}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
