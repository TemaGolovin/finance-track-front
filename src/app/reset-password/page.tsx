import { ResetPasswordForm } from '@/feature/auth-reset-password';
import { getTranslations } from 'next-intl/server';

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const t = await getTranslations('resetPassword');
  const { token } = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-62px)]">
      <div className="bg-card p-8 rounded-lg border shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t('title')}</h1>
        <ResetPasswordForm token={token ?? null} />
      </div>
    </div>
  );
}
