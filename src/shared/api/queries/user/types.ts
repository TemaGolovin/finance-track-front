export interface User {
  id: string;
  name: string;
}

export interface Invitation {
  groupId: 'c8e2d4f7-8b6d-4f7b-9f6d-7b6d4f7b6d7b';
  id: 'c8e2d4f7-8b6d-4f7b-9f6d-7b6d4f7b6d7b';
  senderId: 'c8e2d4f7-8b6d-4f7b-9f6d-7b6d4f7b6d7b';
  recipientId: 'c8e2d4f7-8b6d-4f7b-9f6d-7b6d4f7b6d7b';
  status: 'PENDING';
  createdAt: '2023-01-01T00:00:00.000Z';
  updatedAt: '2023-01-01T00:00:00.000Z';
}

export interface InvitationUserReq {
  groupId: string;
  userIds: string[];
}
