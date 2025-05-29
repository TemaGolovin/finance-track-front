import type { MetadataRoute } from 'next';

// src/app/manifest.ts
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Трекер финансов',
    short_name: 'finance-track',
    description: 'App for managing your finances',
    start_url: './',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    icons: [
      {
        src: '/icons/finance-track-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/finance-track-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
