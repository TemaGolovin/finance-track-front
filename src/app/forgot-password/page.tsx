import { ForgotPasswordForm } from '@/feature/auth-forgot-password';
import { getTranslations } from 'next-intl/server';

export default async function ForgotPasswordPage() {
  const t = await getTranslations('forgotPassword');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-62px)]">
      <div className="bg-card p-8 rounded-lg border shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t('title')}</h1>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
