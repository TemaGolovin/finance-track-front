import { InvitationStatusesType } from '../invitation/types';

export interface Group {
  id: string;
  name: string;
  creatorId: string;
  createAt: string;
  updateAt: string;
  creator: {
    id: string;
    name: string;
  };
  users: {
    id: string;
    name: string;
    status: InvitationStatusesType;
  }[];
}
