import { IconCategory } from '@/shared/lib';

export interface CategoryStatRes {
  totalSum: string;
  categories: CategoryInStat[];
}

export interface CategoryInStat {
  id: string;
  name: string;
  sum: string;
  proportion: string;
  color: string;
  icon: IconCategory;
}
