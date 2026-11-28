import { TitlePage } from '@/shared/ui';
import { FeedbackOverview } from '@/widget/feedback-overview';
import { getTranslations } from 'next-intl/server';

export default async function FeedbackPage() {
  const t = await getTranslations('feedback');

  return (
    <div>
      <TitlePage title={t('title')} />
      <FeedbackOverview />
    </div>
  );
}
