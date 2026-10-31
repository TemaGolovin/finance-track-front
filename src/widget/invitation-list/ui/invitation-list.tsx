'use client';

import { ReceivedInvitationCard, SentInvitationCard } from '@/entity/invitation';
import { InvitationStatuses } from '@/shared/api/queries/invitation/types';
import { useInvitations, useUpdateInvitation } from '@/shared/api/queries/user';
import { ROUTES } from '@/shared/model/routes';
import { ListEmptyState, Skeleton, Tabs } from '@/shared/ui';
import { Inbox, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type TabId = 'received' | 'sent';

export const InvitationList = () => {
  const t = useTranslations('invitation');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('received');

  const { data, isLoading, isError } = useInvitations();
  const { mutateAsync: updateInvitation, isPending } = useUpdateInvitation();

  const handleAccept = async (id: string) => {
    const invitation = data?.received.find((inv) => inv.id === id);

    await toast.promise(updateInvitation({ id, status: InvitationStatuses.ACCEPTED }), {
      loading: t('acceptLoading'),
      success: t('acceptSuccess'),
      error: (err) => err?.message || t('updateError'),
    });

    if (invitation?.groupId) {
      router.push(ROUTES.GROUP_CONNECT_CATEGORIES.replace(':id', invitation.groupId));
    }
  };

  const handleDecline = (id: string) => {
    toast.promise(updateInvitation({ id, status: InvitationStatuses.DECLINED }), {
      loading: t('declineLoading'),
      success: t('declineSuccess'),
      error: (err) => err?.message || t('updateError'),
    });
  };

  const handleCancel = (id: string) => {
    toast.promise(updateInvitation({ id, status: InvitationStatuses.CANCELLED }), {
      loading: t('cancelLoading'),
      success: t('cancelSuccess'),
      error: (err) => err?.message || t('updateError'),
    });
  };

  const loadingSkeleton = (
    <div className="flex flex-col gap-2 mt-2">
      {['sk-1', 'sk-2'].map((key) => (
        <Skeleton key={key} className="h-20 w-full rounded-md" />
      ))}
    </div>
  );

  const loadErrorMessage = (
    <p className="text-sm text-destructive text-center py-4">{t('loadError')}</p>
  );

  const receivedContent = isLoading ? (
    loadingSkeleton
  ) : isError || !data ? (
    loadErrorMessage
  ) : (
    <div className="flex flex-col gap-2 mt-2">
      {data?.received.length === 0 ? <ListEmptyState message={t('noReceived')} /> : null}
      {data?.received.map((invitation) => (
        <ReceivedInvitationCard
          key={invitation.id}
          invitation={invitation}
          onAccept={handleAccept}
          onDecline={handleDecline}
          isLoading={isPending}
        />
      ))}
    </div>
  );

  const sentContent = isLoading ? (
    loadingSkeleton
  ) : isError || !data ? (
    loadErrorMessage
  ) : (
    <div className="flex flex-col gap-2 mt-2">
      {data?.sent.length === 0 ? (
        <ListEmptyState
          message={t('noSent')}
          actionLabel={t('emptySentCta')}
          actionHref={ROUTES.GROUP}
        />
      ) : null}
      {data?.sent.map((invitation) => (
        <SentInvitationCard
          key={invitation.id}
          invitation={invitation}
          onCancel={handleCancel}
          isLoading={isPending}
        />
      ))}
    </div>
  );

  return (
    <div className="my-2">
      <Tabs<TabId>
        selectedId={activeTab}
        onSelect={setActiveTab}
        tabsInfo={[
          {
            id: 'received',
            title: t('received'),
            icon: <Inbox className="min-w-5 min-h-5" />,
            content: receivedContent,
          },
          {
            id: 'sent',
            title: t('sent'),
            icon: <Send className="min-w-5 min-h-5" />,
            content: sentContent,
          },
        ]}
      />
    </div>
  );
};
