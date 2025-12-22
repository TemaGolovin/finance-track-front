import { instanceFetch } from '@/shared/api/instances';
import { useQuery } from '@tanstack/react-query';
import { CategoryStatRes } from '../model/types';

export const useCategoriesStat = () =>
  useQuery({
    queryFn: () => instanceFetch<CategoryStatRes>('category/stat'),
    queryKey: ['category', 'stat'],
  });
