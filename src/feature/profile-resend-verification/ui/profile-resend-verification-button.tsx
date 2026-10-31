'use client';

import { useResendVerification } from '@/shared/api/queries/auth';
import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const apiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === 'object' && 'message' in err) {
    const m = (err as { message: unknown }).message;
    if (Array.isArray(m)) return m.join(', ');
    if (typeof m === 'string') return m;
  }
  return fallback;
};

interface ProfileResendVerificationButtonProps {
  email: string;
}

export const ProfileResendVerificationButton = ({
  email,
}: ProfileResendVerificationButtonProps) => {
  const t = useTranslations('profile');
  const tVerify = useTranslations('verifyEmail');
  const { mutateAsync: resend, isPending } = useResendVerification();

  const onClick = () => {
    void toast.promise(resend(email), {
      loading: tVerify('resendLoading'),
      success: tVerify('resendSuccess'),
      error: (err) => apiErrorMessage(err, tVerify('resendError')),
    });
  };

  return (
    <Button type="button" variant="outline" size="sm" disabled={isPending} onClick={onClick}>
      {t('resendVerificationBtn')}
    </Button>
  );
};
