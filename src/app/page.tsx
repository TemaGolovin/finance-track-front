import { hasAuthSession } from '@/shared/lib/auth/has-auth-session';
import { ROUTES } from '@/shared/model/routes';
import { Landing, landingFaq } from '@/widget/landing';
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
      siteName: 'MoneyHive',
    },
  };
}

export default async function Page() {
  if (await hasAuthSession()) {
    redirect(ROUTES.MAIN);
  }

  const t = await getTranslations('landing');
  const locale = await getLocale();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'MoneyHive',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        description: t('metaDescription'),
        inLanguage: locale,
      },
      {
        '@type': 'FAQPage',
        mainEntity: landingFaq.map((item) => ({
          '@type': 'Question',
          name: t(item.questionKey),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t(item.answerKey),
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: статичный JSON-LD, без данных пользователя
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Landing isAuthenticated={false} />
    </>
  );
}
