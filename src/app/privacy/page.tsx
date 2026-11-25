import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { PrivacyEnContent } from '@/shared/lib/legal/privacy-en-content';
import { PrivacyRuContent } from '@/shared/lib/legal/privacy-ru-content';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal');
  const locale = await getLocale();
  const title = t('privacyTitle');
  const description = t('privacyDescription');

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

export default async function PrivacyPage() {
  const t = await getTranslations('legal');
  const locale = await getLocale();

  return (
    <div className="mx-auto max-w-2xl py-6 pb-12 text-card-foreground">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        {t('privacyTitle')}
      </h1>
      {locale === 'ru' ? <PrivacyRuContent /> : <PrivacyEnContent />}
    </div>
  );
}
