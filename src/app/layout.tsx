import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/shared/lib/shadcn/sonner';
import { Header } from '@/widget/header';
import { Sidebar } from '@/widget/sidebar';
import { UnverifiedEmailBanner } from '@/widget/unverified-email-banner';
import { getLocale } from 'next-intl/server';
import { Providers } from './_providers/providers';

export const metadata: Metadata = {
  title: 'MoneyHive',
  description: 'App for managing your finances',
  icons: {
    apple: '/icons/finance-track-icon-512x512.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Providers>
          <Header />
          <UnverifiedEmailBanner />
          <main className="container mx-auto px-2 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:px-0">
            {children}
          </main>
          <Sidebar />
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
