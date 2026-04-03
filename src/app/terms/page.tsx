import type { Metadata } from 'next';
import { TermsRuContent } from '@/shared/lib/legal/terms-ru-content';

const title = 'Пользовательское соглашение';
const description =
  'Условия использования веб-приложения Finance Tracker для учёта доходов и расходов.';

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

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl py-6 pb-12 text-card-foreground">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <TermsRuContent />
    </div>
  );
}
