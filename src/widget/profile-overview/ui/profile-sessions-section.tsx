'use client';

import { ProfileSessionRevokeButton } from '@/feature/profile-session-revoke';
import { useAuthSessions } from '@/shared/api/queries/auth';
import { Skeleton } from '@/shared/ui';
import { useLocale, useTranslations } from 'next-intl';

export const ProfileSessionsSection = () => {
  const t = useTranslations('profile');
  const locale = useLocale();
  const { data: sessionsRes, isLoading: sessionsLoading } = useAuthSessions(true);
  const sessions = sessionsRes?.data ?? [];

  return (
    <div className="bg-card rounded-md p-3 flex flex-col gap-3">
      <div className="text-foreground/60 text-sm">{t('sessionsSection')}</div>
      {sessionsLoading ? (
        <Skeleton className="h-16 w-full rounded-md" />
      ) : sessions.length === 0 ? (
        <p className="text-sm text-muted-foreground">—</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {sessions.map((s) => (
            <li
              key={s.deviceId}
              className="flex flex-col gap-2 border-b border-muted/60 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-medium text-sm">
                    {s.isCurrent
                      ? t('sessionCurrent')
                      : (s.userAgent ?? t('sessionUnknownDevice'))}
                  </div>
                  {s.isCurrent && s.userAgent ? (
                    <div className="text-xs text-muted-foreground truncate">{s.userAgent}</div>
                  ) : null}
                  <div className="text-xs text-muted-foreground mt-1">
                    {t('sessionExpires')}:{' '}
                    {new Date(s.expiresAt).toLocaleString(locale, {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </div>
                </div>
                <ProfileSessionRevokeButton deviceId={s.deviceId} isCurrent={s.isCurrent} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
