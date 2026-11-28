import { useCategoryDelete } from '@/shared/api/queries/categories';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { ROUTES } from '@/shared/model/routes';
import { Button, Drawer } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';
import { CategoryDeletePanel, useCategoryDeleteCopy } from './category-delete-panel';

interface CategoryDeleteProps {
  categoryId: string;
  triggerBtnClasses?: string;
  isDefault?: boolean;
  hasOperations?: boolean;
  hasGroupMapping?: boolean;
}

export const CategoryDelete: FC<CategoryDeleteProps> = ({
  categoryId,
  triggerBtnClasses,
  isDefault = false,
  hasOperations = false,
  hasGroupMapping = false,
}) => {
  const commonT = useTranslations('common');
  const router = useRouter();
  const { mutateAsync: categoryDelete } = useCategoryDelete();
  const { canDelete, blockReasons, title, description, categoryT } = useCategoryDeleteCopy({
    isDefault,
    hasOperations,
    hasGroupMapping,
  });

  const onDelete = async (onClose: () => void) => {
    try {
      await toast.promise(categoryDelete({ id: categoryId }), {
        loading: categoryT('deleteCategoryLoading'),
        success: categoryT('deleteCategorySuccess'),
        error: (data) => data?.message || categoryT('deleteCategoryError'),
      });
      onClose();
      router.push(ROUTES.CATEGORY);
    } catch {
      // toast.promise already shows the error
    }
  };

  return (
    <Drawer
      title={title}
      description={description}
      trigger={
        <Button
          type="button"
          variant="destructive"
          className={cn(triggerBtnClasses, !canDelete && 'opacity-60')}
        >
          {commonT('delete')}
        </Button>
      }
      renderContent={(onClose) => (
        <CategoryDeletePanel
          canDelete={canDelete}
          blockReasons={blockReasons}
          onConfirm={() => onDelete(onClose)}
        />
      )}
    />
  );
};
