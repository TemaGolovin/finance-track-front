import { CreateCategoryReq } from '@/shared/api/queries/categories/types';
import { CategoryFormType } from './schema';

export const mapCategoryFormToDto = (data: CategoryFormType): CreateCategoryReq => {
  return {
    categoryType: data.type,
    name: data.name,
    color: data.color,
    icon: data.icon,
  };
};
