import { LoginForm } from '@/feature/auth';
import { ROUTES } from '@/shared/model/routes';
import { LinkButton } from '@/shared/ui/link/link';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const LoginWidget = async () => {
  const t = await getTranslations();
  const linkClass =
    'text-muted-foreground underline underline-offset-2 hover:text-foreground hover:no-underline text-xs';

  return (
    <div>
      <div className="bg-card p-4 rounded-lg flex justify-center items-center flex-col text-center border  shadow-md">
        <h1 className="text-2xl font-bold mb-4">{t('auth.auth')}</h1>
        <LoginForm />
        <div className="flex gap-1 w-full">
          <LinkButton href={ROUTES.REGISTER} className="flex-1">
            {t('auth.accNotExist')}
          </LinkButton>
          <LinkButton href={ROUTES.FORGOT_PASSWORD} className="flex-1">
            {t('forgotPassword.title')}
          </LinkButton>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-1">
        <Link href={ROUTES.PRIVACY} className={linkClass} target="_blank" rel="noopener noreferrer">
          {t('legal.privacyPolicy')}
        </Link>
        <Link href={ROUTES.TERMS} className={linkClass} target="_blank" rel="noopener noreferrer">
          {t('legal.userAgreement')}
        </Link>
      </div>
    </div>
  );
};
