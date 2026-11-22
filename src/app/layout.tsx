import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Providers } from './_providers/providers';
import { getLocale } from 'next-intl/server';
import { Header } from '@/widget/header';
import { Toaster } from '@/shared/lib/shadcn/sonner';

export const metadata: Metadata = {
  title: 'Finance Tracker',
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
          <main className="container mx-auto px-2 sm:px-0">{children}</main>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
