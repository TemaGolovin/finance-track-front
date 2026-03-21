'use client';

import { useState } from 'react';
import { useInvitations, useUpdateInvitation } from '@/shared/api/queries/user';
import { Tabs } from '@/shared/ui';
import { ReceivedInvitationCard, SentInvitationCard } from '@/entity/invitation';
import { InvitationStatuses } from '@/shared/api/queries/invitation/types';
import { useTranslations } from 'next-intl';

type TabId = 'received' | 'sent';

export const InvitationList = () => {
  const t = useTranslations('invitation');
  const [activeTab, setActiveTab] = useState<TabId>('received');

  const { data } = useInvitations();
  const { mutate: updateInvitation, isPending } = useUpdateInvitation();

  const handleAccept = (id: string) => {
    updateInvitation({ id, status: InvitationStatuses.ACCEPTED });
  };

  const handleDecline = (id: string) => {
    updateInvitation({ id, status: InvitationStatuses.DECLINED });
  };

  const handleCancel = (id: string) => {
    updateInvitation({ id, status: InvitationStatuses.CANCELLED });
  };

  const receivedContent = (
    <div className="flex flex-col gap-2 mt-2">
      {data?.received.length === 0 && (
        <p className="text-sm text-foreground/60 text-center py-4">{t('noReceived')}</p>
      )}
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

  const sentContent = (
    <div className="flex flex-col gap-2 mt-2">
      {data?.sent.length === 0 && (
        <p className="text-sm text-foreground/60 text-center py-4">{t('noSent')}</p>
      )}
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
          { id: 'received', title: t('received'), content: receivedContent },
          { id: 'sent', title: t('sent'), content: sentContent },
        ]}
      />
    </div>
  );
};
