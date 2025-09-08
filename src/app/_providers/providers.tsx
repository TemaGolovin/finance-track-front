import { QueryProvider } from './query-client-provider';
import { ThemeProvider } from './theme-provider';
import { NextIntlClientProvider } from 'next-intl';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <NextIntlClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </QueryProvider>
  );
};
