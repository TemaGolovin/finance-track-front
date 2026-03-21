import { InvitationStatuses, InvitationStatusesType } from '@/shared/api/queries/invitation/types';

export const invitationStatusToKeyMessage: Record<InvitationStatusesType, string> = {
  [InvitationStatuses.CANCELLED]: 'invitationCancelled',
  [InvitationStatuses.DECLINED]: 'invitationDeclined',
  [InvitationStatuses.PENDING]: 'invitationAcceptPending',
  [InvitationStatuses.ACCEPTED]: 'invitationAccepted',
};
