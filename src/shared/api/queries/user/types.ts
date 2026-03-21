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
