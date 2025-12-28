export interface CreateOperationReq {
  type: 'INCOME' | 'EXPENSE';
  value: number;
  operationDate: string;
  categoryId: string;
  comment?: string;
}

export interface CreateOperationRes {
  id: string;
  comment: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  categoryId: string;
  operationDate: string;
  createAt: string;
  updateAt: string;
  userId: string;
}
