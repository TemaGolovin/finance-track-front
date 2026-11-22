import { hasAuthSession } from '@/shared/lib/auth/has-auth-session';
import { ROUTES } from '@/shared/model/routes';
import { Landing } from '@/widget/landing';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('landing');
  const locale = await getLocale();
  const title = t('metaTitle');
  const description = t('metaDescription');

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Finance Tracker',
    },
  };
}

export default async function AboutPage() {
  if (!(await hasAuthSession())) {
    redirect(ROUTES.HOME);
  }

  return <Landing isAuthenticated />;
}
