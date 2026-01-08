import { IconCategory } from '@/shared/lib';

export interface Category {
  id: string;
  name: string;
  userId: string;
  createAt: string;
  updateAt: string;
  color: string;
  icon: IconCategory;
  categoryType: 'INCOME' | 'EXPENSE';
  defaultKey?: string;
}

export interface CreateCategoryReq
  extends Pick<Category, 'name' | 'categoryType' | 'color' | 'icon'> {}
