import { ThemeProvider } from './theme-provider';
import { NextIntlClientProvider } from 'next-intl';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};
