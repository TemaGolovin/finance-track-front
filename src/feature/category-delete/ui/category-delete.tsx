import { useCategoryDelete } from '@/shared/api/queries/categories';
import { ROUTES } from '@/shared/model/routes';
import { Button, Drawer } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface CategoryDeleteProps {
  categoryId: string;
  triggerBtnClasses: string;
}

export const CategoryDelete: FC<CategoryDeleteProps> = ({ categoryId, triggerBtnClasses }) => {
  const commonT = useTranslations('common');
  const categoryT = useTranslations('category');

  const router = useRouter();

  const { mutateAsync: categoryDelete } = useCategoryDelete();

  const onDelete = async () => {
    await toast.promise(categoryDelete({ id: categoryId }), {
      loading: categoryT('deleteCategoryLoading'),
      success: categoryT('deleteCategorySuccess'),
      error: (data) => data?.message || categoryT('deleteCategoryError'),
    });

    router.push(ROUTES.CATEGORY);
  };
  return (
    <Drawer
      title={categoryT('deletingCategory')}
      trigger={
        <Button variant={'destructive'} className={triggerBtnClasses}>
          {commonT('delete')}
        </Button>
      }
      description={categoryT('confirmDelete')}
      renderContent={() => (
        <Button variant={'destructive'} onClick={onDelete} className="w-full">
          {commonT('delete')}
        </Button>
      )}
    />
  );
};
