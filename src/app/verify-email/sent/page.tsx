import { ResendVerificationForm } from '@/feature/auth-verify-email';
import { MailCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailSentPage({ searchParams }: Props) {
  const t = await getTranslations('verifyEmail');
  const { email } = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-62px)]">
      <div className="bg-card p-8 rounded-lg border shadow-md w-full max-w-md flex flex-col items-center gap-6">
        <MailCheck className="h-14 w-14 text-primary" />
        <h1 className="text-2xl font-bold text-center">{t('sentTitle')}</h1>
        <p className="text-muted-foreground text-center text-sm">{t('sentDesc')}</p>
        <ResendVerificationForm defaultEmail={email} />
      </div>
    </div>
  );
}
