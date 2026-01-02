'use client';
import { OperationTypeFilter } from '@/feature/operation-filters';
import { useCategories } from '@/shared/api/queries/categories';
import { useState } from 'react';
import { CategoryItem } from './category-item';
import { CategoryCreateAction } from './category-create-action';

export const CategoryList = () => {
  const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');

  const { data: categories } = useCategories({ type });

  return (
    <div className="flex flex-col gap-3 mt-2">
      <OperationTypeFilter operationType={type} setOperationType={setType} />
      <div
        className={
          'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 w-full gap-x-2 gap-y-1 justify-center max-h-[70dvh] overflow-y-auto'
        }
      >
        {categories?.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
      <div className="text-center">
        <CategoryCreateAction />
      </div>
    </div>
  );
};
