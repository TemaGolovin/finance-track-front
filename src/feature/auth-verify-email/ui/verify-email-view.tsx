'use client';

import { useVerifyEmail } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Status = 'pending' | 'success' | 'error';

interface VerifyEmailViewProps {
  token: string;
}

export const VerifyEmailView = ({ token }: VerifyEmailViewProps) => {
  const t = useTranslations('verifyEmail');
  const tCommon = useTranslations('common');
  const [status, setStatus] = useState<Status>('pending');
  const [errorMsg, setErrorMsg] = useState('');

  const { mutateAsync: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    verifyEmail(token)
      .then(() => setStatus('success'))
      .catch((err: { message?: string }) => {
        setStatus('error');
        setErrorMsg(err?.message ?? '');
      });
  }, [token, verifyEmail]);

  if (status === 'pending') {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">{t('verifying')}</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h1 className="text-2xl font-bold">{t('success')}</h1>
        <p className="text-muted-foreground">{t('successDesc')}</p>
        <Button asChild variant="primary">
          <Link href={ROUTES.MAIN}>{t('toMain')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <XCircle className="h-12 w-12 text-destructive" />
      <h1 className="text-2xl font-bold">{t('error')}</h1>
      <p className="text-muted-foreground">{errorMsg || t('errorExpired')}</p>
      <Button asChild variant="primary">
        <Link href={ROUTES.LOGIN}>{tCommon('login')}</Link>
      </Button>
    </div>
  );
};
