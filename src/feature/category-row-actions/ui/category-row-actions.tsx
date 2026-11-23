'use client';

import { useCategoryDelete } from '@/shared/api/queries/categories';
import { Category } from '@/shared/api/queries/categories/types';
import { ROUTES } from '@/shared/model/routes';
import { LongPressAction, LongPressActions } from '@/shared/ui';
import { Pencil, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useMemo } from 'react';
import { toast } from 'sonner';

interface CategoryRowActionsProps {
  category: Category;
  className?: string;
  children: ReactNode;
}

export const CategoryRowActions: FC<CategoryRowActionsProps> = ({
  category,
  className,
  children,
}) => {
  const commonT = useTranslations('common');
  const categoryT = useTranslations('category');
  const router = useRouter();
  const { mutateAsync: deleteCategory } = useCategoryDelete();

  const actions = useMemo<LongPressAction[]>(
    () => [
      {
        id: 'edit',
        label: commonT('edit'),
        icon: <Pencil className="w-5 h-5" />,
        onSelect: () => {
          router.push(ROUTES.CATEGORY_EDIT.replace(':id', category.id));
        },
      },
      {
        id: 'delete',
        label: commonT('delete'),
        icon: <Trash className="w-5 h-5" />,
        destructive: true,
        confirm: {
          title: categoryT('deletingCategory'),
          description: categoryT('confirmDelete'),
          confirmLabel: commonT('delete'),
        },
        onSelect: () =>
          toast
            .promise(deleteCategory({ id: category.id }), {
              loading: categoryT('deleteCategoryLoading'),
              success: categoryT('deleteCategorySuccess'),
              error: (data) => data?.message || categoryT('deleteCategoryError'),
            })
            .unwrap(),
      },
    ],
    [category.id, categoryT, commonT, deleteCategory, router],
  );

  return (
    <LongPressActions className={className} title={category.name} actions={actions}>
      {children}
    </LongPressActions>
  );
};
