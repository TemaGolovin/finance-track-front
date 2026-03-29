'use client';

import { useConfirmEmailChange } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Status = 'pending' | 'success' | 'error';

interface ConfirmEmailChangeViewProps {
  token: string;
}

export const ConfirmEmailChangeView = ({ token }: ConfirmEmailChangeViewProps) => {
  const t = useTranslations('confirmEmailChange');
  const [status, setStatus] = useState<Status>('pending');
  const [errorMsg, setErrorMsg] = useState('');

  const { mutateAsync: confirmChange } = useConfirmEmailChange();

  useEffect(() => {
    confirmChange(token)
      .then(() => setStatus('success'))
      .catch((err: { message?: string }) => {
        setStatus('error');
        setErrorMsg(err?.message ?? '');
      });
  }, [token, confirmChange]);

  if (status === 'pending') {
    return (
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">{t('verifying')}</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <p className="text-muted-foreground">{t('success')}</p>
        <Button asChild variant="primary">
          <Link href={ROUTES.PROFILE}>{t('toProfile')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <XCircle className="h-12 w-12 text-destructive" />
      <p className="text-muted-foreground">{errorMsg || t('errorExpired')}</p>
    </div>
  );
};
