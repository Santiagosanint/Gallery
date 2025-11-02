
import React from 'react';
import { BackgroundPaths } from '../gallery-components/BackgroundPaths';
import { GlowEffect } from '../gallery-components/GlowEffect';
import { ShootingStars } from '../gallery-components/ShootingStars';
import { DynamicStars } from '../gallery-components/DynamicStars';
import { ModernAIChat } from '../gallery-components/ModernAIChat';
import { MinimalistAIChat } from '../gallery-components/MinimalistAIChat';
import { BentoAIChat } from '../gallery-components/BentoAIChat';
import { WidgetsIcon } from '../constants';

export const implementedComponentsMap: { [key: string]: React.FC<any> } = {
  BackgroundPaths,
  GlowEffect,
  ShootingStars,
  DynamicStars,
  ModernAIChat,
  MinimalistAIChat,
  BentoAIChat,
};

export const categorySections = [
    {
        title: 'Marketing Blocks',
        categories: [
            { name: 'Home', count: 21, isTop: true },
            { name: 'Shaders', count: 41, isTop: true, isNew: true },
            { name: 'Abstract', count: 73 },
            { name: 'AI Chats', count: 3 },
            { name: 'Backgrounds', count: 33 },
            { name: 'Borders', count: 11 },
            { name: 'Calls to Action', count: 22 },
            { name: 'Clients', count: 18 },
            { name: 'Comparisons', count: 4 },
            { name: 'Docks', count: 17 },
            { name: 'Features', count: 20 },
            { name: 'Footers', count: 10 },
            { name: 'Hooks', count: 10 },
            { name: 'Images', count: 21 },
            { name: 'Maps', count: 7 },
            { name: 'Navigation Menus', count: 8 },
            { name: 'Pricing Sections', count: 12 },
            { name: 'Scroll Areas', count: 15 },
            { name: 'Testimonials', count: 11 },
            { name: 'Texts', count: 58 },
            { name: 'Videos', count: 9 },
        ]
    }
];