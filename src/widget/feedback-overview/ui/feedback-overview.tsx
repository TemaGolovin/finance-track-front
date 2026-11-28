'use client';

import { FeedbackSubmitForm } from '@/feature/feedback-submit';
import { useAboutMe } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button, Skeleton } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const FeedbackOverview = () => {
  const t = useTranslations('feedback');
  const tCommon = useTranslations('common');
  const { data: me, isLoading, isError } = useAboutMe();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 mt-2">
        <Skeleton className="h-64 w-full rounded-md" />
      </div>
    );
  }

  if (isError || !me?.data) {
    return (
      <div className="mt-4 text-center text-muted-foreground">
        <p>{t('needLogin')}</p>
        <Button asChild variant="primary" className="mt-3">
          <Link href={ROUTES.LOGIN}>{tCommon('login')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-2 pb-8">
      <FeedbackSubmitForm initialReplyEmail={me.data.email} />
    </div>
  );
};
