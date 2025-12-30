import { IconCategory } from '@/shared/lib';

export interface CreateOperationReq {
  type: 'INCOME' | 'EXPENSE';
  value: number;
  operationDate: string;
  categoryId: string;
  comment?: string;
}

export interface Operation {
  id: string;
  comment: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  categoryId: string;
  operationDate: string;
  createAt: string;
  updateAt: string;
  userId: string;
  category: {
    name: string;
    color: string;
    icon: IconCategory;
  };
}

export interface GetOperationsRes {
  totalSum: number;
  operationsByDate: {
    date: string;
    operations: Operation[];
  }[];
}
