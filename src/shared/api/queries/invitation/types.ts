export const InvitationStatuses = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  CANCELLED: 'CANCELLED',
} as const;

export type InvitationStatusesType = (typeof InvitationStatuses)[keyof typeof InvitationStatuses];
