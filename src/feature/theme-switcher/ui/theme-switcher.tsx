'use client';

import { Button, Tooltip } from '@/shared/ui';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme, systemTheme } = useTheme();
  const t = useTranslations();

  const SystemThemeIcon = systemTheme === 'dark' ? Moon : Sun;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Tooltip content={t('common.changeTheme')}>
      <Button
        variant="default"
        size="icon"
        onClick={() => {
          if (theme) {
            const isSystem = theme === 'system';
            const currentTheme = isSystem ? systemTheme : theme;
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            setTheme(nextTheme);
          }
        }}
        aria-label="Change theme"
      >
        {isMounted && (
          <>
            {theme === 'light' && <Sun />}
            {theme === 'dark' && <Moon />}
            {theme === 'system' && <SystemThemeIcon />}
          </>
        )}
      </Button>
    </Tooltip>
  );
};
