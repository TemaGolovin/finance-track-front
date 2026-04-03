import type { Metadata } from 'next';
import { PrivacyRuContent } from '@/shared/lib/legal/privacy-ru-content';

const title = 'Политика в отношении обработки персональных данных';
const description =
  'Порядок обработки персональных данных пользователей веб-приложения Finance Tracker.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl py-6 pb-12 text-card-foreground">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <PrivacyRuContent />
    </div>
  );
}
