'use client';
import { OperationTypeFilter } from '@/feature/operation-filters';
import { useCategories } from '@/shared/api/queries/categories';
import { Skeleton } from '@/shared/ui';
import { useState } from 'react';
import { CategoryCreateAction } from './category-create-action';
import { CategoryItem } from './category-item';
import { CategoryListEmpty } from './category-list-empty';

export const CategoryList = () => {
  const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');

  const { data: categories, isLoading } = useCategories({ type });

  const isEmpty = !isLoading && categories?.length === 0;

  return (
    <div className="flex flex-col gap-3 mt-2">
      <OperationTypeFilter operationType={type} setOperationType={setType} />
      <div
        className={
          'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 w-full gap-x-2 gap-y-1 justify-center max-h-[70dvh] overflow-y-auto'
        }
      >
        {isLoading
          ? ['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6'].map((key) => (
              <div key={key} className="flex flex-col items-center gap-2 py-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))
          : categories?.map((category) => <CategoryItem category={category} key={category.id} />)}
      </div>

      {isEmpty ? <CategoryListEmpty /> : null}

      {!isEmpty ? <CategoryCreateAction /> : null}
    </div>
  );
};
