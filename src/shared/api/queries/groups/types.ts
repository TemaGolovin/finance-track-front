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
    user: {
      id: string;
      name: string;
      status: InvitationStatusesType;
    };
  }[];
}

export interface GroupCategory {
  id: string;
  name: string;
  categoryType: 'EXPENSE' | 'INCOME';
  defaultKey: string | null;
  connectedPersonalCategoryId: string | null;
}

export interface ConnectGroupCategoriesReq {
  groupId: string;
  relatedCategories: { personalCategoryId: string; groupCategoryId: string }[];
}

export interface CreateGroupCategoryReq {
  name: string;
  categoryType: 'EXPENSE' | 'INCOME';
}

export interface UpdateGroupCategoryReq {
  name?: string;
  categoryType?: 'EXPENSE' | 'INCOME';
}

export interface GroupStatCategory {
  id: string;
  name: string;
  totalAmount: string;
  proportion: string;
}

export interface GroupStatRes {
  totalSum: string;
  byCategories: GroupStatCategory[];
}
