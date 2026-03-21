import { FC } from 'react';
import { SentInvitation } from '@/shared/api/queries/user';
import { BaseCard, Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { InvitationStatuses } from '@/shared/api/queries/invitation/types';
import { X } from 'lucide-react';

interface SentInvitationCardProps {
  invitation: SentInvitation;
  onCancel: (id: string) => void;
  isLoading?: boolean;
}

export const SentInvitationCard: FC<SentInvitationCardProps> = ({
  invitation,
  onCancel,
  isLoading,
}) => {
  const t = useTranslations('invitation');

  const isPending = invitation.status === InvitationStatuses.PENDING;

  return (
    <BaseCard title={invitation.group.name}>
      <div className="grid grid-cols-[auto_1fr] gap-x-2 items-center">
        <div className="text-xs text-foreground/60">{t('to')}:</div>
        <div>{invitation.recipient.name}</div>
        <div className="text-xs text-foreground/60">{t('status')}:</div>
        <div>{t(`statuses.${invitation.status}`)}</div>
      </div>
      {isPending && (
        <div className="mt-3">
          <Button
            size="sm"
            className="text-destructive bg-destructive/10 border border-destructive/60 w-full"
            onClick={() => onCancel(invitation.id)}
            disabled={isLoading}
          >
            <X className="w-4 h-4 mr-1 inline-block text-destructive" />
            {t('cancel')}
          </Button>
        </div>
      )}
    </BaseCard>
  );
};
