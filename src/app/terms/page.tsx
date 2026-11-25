import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { TermsEnContent } from '@/shared/lib/legal/terms-en-content';
import { TermsRuContent } from '@/shared/lib/legal/terms-ru-content';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal');
  const locale = await getLocale();
  const title = t('termsTitle');
  const description = t('termsDescription');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
    },
  };
}

export default async function TermsPage() {
  const t = await getTranslations('legal');
  const locale = await getLocale();

  return (
    <div className="mx-auto max-w-2xl py-6 pb-12 text-card-foreground">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">{t('termsTitle')}</h1>
      {locale === 'ru' ? <TermsRuContent /> : <TermsEnContent />}
    </div>
  );
}
