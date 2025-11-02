import React from 'react';

export interface ComponentData {
  id: string;
  name: string;
  category: string;
  author: string;
  authorAvatar: string;
  authorHandle: string;
  variant: string;
  component?: React.FC<any>;
  // FIX: Add optional 'componentId' property to align the type with the fetched data structure.
  componentId?: string;
  description: string;
  code: string;
  previewBg?: 'light' | 'dark';
  embedUrl?: string;
  previewImageUrl?: string;
}
