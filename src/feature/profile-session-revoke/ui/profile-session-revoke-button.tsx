'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useRevokeSession } from '@/shared/api/queries/auth';
import { Button } from '@/shared/ui';

const apiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === 'object' && 'message' in err) {
    const m = (err as { message: unknown }).message;
    if (Array.isArray(m)) return m.join(', ');
    if (typeof m === 'string') return m;
  }
  return fallback;
};

interface ProfileSessionRevokeButtonProps {
  deviceId: string;
  isCurrent: boolean;
}

export const ProfileSessionRevokeButton = ({
  deviceId,
  isCurrent,
}: ProfileSessionRevokeButtonProps) => {
  const t = useTranslations('profile');
  const { mutateAsync: revokeSession, isPending } = useRevokeSession();

  if (isCurrent) {
    return null;
  }

  const onClick = () => {
    void toast.promise(revokeSession(deviceId), {
      loading: t('sessionRevokeLoading'),
      success: t('sessionRevokeSuccess'),
      error: (err) => apiErrorMessage(err, t('sessionRevokeError')),
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={onClick}
      className="text-destructive border-destructive/50 hover:bg-destructive/10"
    >
      {t('sessionRevoke')}
    </Button>
  );
};
