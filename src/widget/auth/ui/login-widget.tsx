import { LoginForm } from '@/feature/auth';
import { ROUTES } from '@/shared/model/routes';
import { LinkButton } from '@/shared/ui/link/link';
import { getTranslations } from 'next-intl/server';

export const LoginWidget = async () => {
  const t = await getTranslations();

  return (
    <div className="bg-card p-4 rounded-lg absolute top-1/2 -translate-y-1/2 text-center border  shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t('auth.auth')}</h1>
      <LoginForm />
      <div className="flex flex-col gap-1">
        <LinkButton href={ROUTES.REGISTER}>{t('auth.accNotExist')}</LinkButton>
        <LinkButton href={ROUTES.FORGOT_PASSWORD}>{t('forgotPassword.title')}</LinkButton>
      </div>
    </div>
  );
};
