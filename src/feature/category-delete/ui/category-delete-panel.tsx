import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';

export type CategoryDeleteBlockFlags = {
  hasOperations?: boolean;
  hasGroupMapping?: boolean;
};

export function canDeleteCategory({
  hasOperations,
  hasGroupMapping,
}: CategoryDeleteBlockFlags): boolean {
  return !hasOperations && !hasGroupMapping;
}

export function useCategoryDeleteCopy(flags: CategoryDeleteBlockFlags & { isDefault?: boolean }) {
  const categoryT = useTranslations('category');
  const canDelete = canDeleteCategory(flags);

  const blockReasons = useMemo(
    () =>
      [
        flags.hasOperations ? categoryT('deleteBlockedHasOperations') : null,
        flags.hasGroupMapping ? categoryT('deleteBlockedHasGroupMapping') : null,
      ].filter((reason): reason is string => Boolean(reason)),
    [categoryT, flags.hasGroupMapping, flags.hasOperations],
  );

  const title = canDelete ? categoryT('deletingCategory') : categoryT('deleteBlockedTitle');
  const description = canDelete
    ? flags.isDefault
      ? `${categoryT('confirmDelete')} ${categoryT('defaultCategoryDeleteWarning')}`
      : categoryT('confirmDelete')
    : undefined;

  return { canDelete, blockReasons, title, description, categoryT };
}

interface CategoryDeletePanelProps {
  canDelete: boolean;
  blockReasons: string[];
  isSubmitting?: boolean;
  onConfirm: () => void;
}

export const CategoryDeletePanel: FC<CategoryDeletePanelProps> = ({
  canDelete,
  blockReasons,
  isSubmitting = false,
  onConfirm,
}) => {
  const commonT = useTranslations('common');
  const categoryT = useTranslations('category');

  if (canDelete) {
    return (
      <Button
        type="button"
        variant="destructive"
        className="w-full"
        disabled={isSubmitting}
        onClick={onConfirm}
      >
        {commonT('delete')}
      </Button>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{categoryT('deleteBlockedIntro')}</p>
      <ul className="space-y-2">
        {blockReasons.map((reason) => (
          <li
            key={reason}
            className="flex items-start gap-2 text-sm rounded-md bg-muted/50 px-3 py-2"
          >
            <span className="text-destructive mt-0.5">•</span>
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
