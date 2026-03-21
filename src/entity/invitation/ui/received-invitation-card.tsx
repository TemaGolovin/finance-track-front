import { FC } from 'react';
import { ReceivedInvitation } from '@/shared/api/queries/user';
import { BaseCard, Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { InvitationStatuses } from '@/shared/api/queries/invitation/types';
import { Check, X } from 'lucide-react';

interface ReceivedInvitationCardProps {
  invitation: ReceivedInvitation;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isLoading?: boolean;
}

export const ReceivedInvitationCard: FC<ReceivedInvitationCardProps> = ({
  invitation,
  onAccept,
  onDecline,
  isLoading,
}) => {
  const t = useTranslations('invitation');

  const isPending = invitation.status === InvitationStatuses.PENDING;

  return (
    <BaseCard title={invitation.group.name}>
      <div className="grid grid-cols-[auto_1fr] gap-x-2 items-center">
        <div className="text-xs text-foreground/60">{t('from')}:</div>
        <div>{invitation.sender.name}</div>
        <div className="text-xs text-foreground/60">{t('status')}:</div>
        <div>{t(`statuses.${invitation.status}`)}</div>
      </div>
      {isPending && (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            onClick={() => onAccept(invitation.id)}
            disabled={isLoading}
            className="flex-1 text-success bg-success/10 border border-success/60"
          >
            <Check className="w-4 h-4 mr-1 inline-block text-success" />
            {t('accept')}
          </Button>
          <Button
            size="sm"
            onClick={() => onDecline(invitation.id)}
            disabled={isLoading}
            className="flex-1 bg-destructive/10 border border-destructive/60 text-destructive"
          >
            <X className="w-4 h-4 mr-1 inline-block text-destructive" />
            {t('decline')}
          </Button>
        </div>
      )}
    </BaseCard>
  );
};
