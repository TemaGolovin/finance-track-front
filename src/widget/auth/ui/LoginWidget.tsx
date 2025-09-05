import { LoginForm } from '@/feature/auth';
import { Button } from '@/shared/ui';
import { getTranslations } from 'next-intl/server';

export const LoginWidget = async () => {
  const t = await getTranslations();

  return (
    <div className="bg-card p-4 rounded-lg absolute top-1/2 -translate-y-1/2 text-center border  shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t('auth.auth')}</h1>
      <LoginForm />
      <Button variant={'ghost'} className="underline" size={'sm'}>
        {t('auth.accNotExist')}
      </Button>
    </div>
  );
};
