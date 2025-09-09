import { RegistrationForm } from '@/feature/auth';
import { ROUTES } from '@/shared/model/routes';
import { LinkButton } from '@/shared/ui/link/link';
import { getTranslations } from 'next-intl/server';

export const RegisterWidget = async () => {
  const t = await getTranslations();

  return (
    <div className="bg-card p-4 rounded-lg absolute top-1/2 -translate-y-1/2 text-center border  shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t('registration.registration')}</h1>
      <RegistrationForm />
      <LinkButton href={ROUTES.LOGIN}>{t('registration.accAlreadyExist')}</LinkButton>
    </div>
  );
};
