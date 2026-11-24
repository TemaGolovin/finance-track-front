'use client';

import { useUpdatePreferences } from '@/shared/api/queries/auth';
import { useWeekStartsOn } from '@/shared/lib/date/use-week-starts-on';
import type { WeekStartsOn } from '@/shared/lib/date/week-starts-on';
import { ToggleGroup } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const WEEK_START_IDS = ['1', '0'] as const;

function parseWeekStartsOn(id: string): WeekStartsOn | null {
  if (id === '0' || id === '1') {
    return Number(id) as WeekStartsOn;
  }
  return null;
}

export const WeekStartSetting = () => {
  const t = useTranslations('settings');
  const weekStartsOn = useWeekStartsOn();
  const { mutateAsync: updatePreferences } = useUpdatePreferences();

  const handleSelect = async (id: string) => {
    const next = parseWeekStartsOn(id);
    if (next === null || next === weekStartsOn) {
      return;
    }

    await toast.promise(updatePreferences(next), {
      loading: t('weekStartLoading'),
      success: t('weekStartSuccess'),
      error: (err: unknown) =>
        err instanceof Error ? err.message : t('weekStartError'),
    });
  };

  return (
    <ToggleGroup
      key={String(weekStartsOn)}
      selectedId={String(weekStartsOn)}
      onClick={handleSelect}
      items={WEEK_START_IDS.map((id) => ({
        id,
        ariaLabel: id === '1' ? t('weekStartMonday') : t('weekStartSunday'),
        content: id === '1' ? t('weekStartMonday') : t('weekStartSunday'),
      }))}
    />
  );
};