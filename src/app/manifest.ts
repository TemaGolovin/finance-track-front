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
        src: '/icons/finance-track-icon-transparent-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/finance-track-icon-transparent-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/finance-track-icon-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/finance-track-icon-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
