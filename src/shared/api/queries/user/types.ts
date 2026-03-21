import { InvitationStatusesType } from '../invitation/types';

export interface User {
  id: string;
  name: string;
}

export interface Invitation {
  groupId: string;
  id: string;
  senderId: string;
  recipientId: string;
  status: InvitationStatusesType;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationUserReq {
  groupId: string;
  userIds: string[];
}

export interface ReceivedInvitation extends Invitation {
  sender: { name: string };
  group: { name: string };
}

export interface SentInvitation extends Invitation {
  recipient: { name: string };
  group: { name: string };
}

export interface InvitationsResponse {
  received: ReceivedInvitation[];
  sent: SentInvitation[];
}

export interface UpdateInvitationReq {
  id: string;
  status: InvitationStatusesType;
}
