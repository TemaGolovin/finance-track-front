'use client';

import { Button, Hint } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useHasUnmappedCategories } from '../model/use-has-unmapped-categories';

interface UnmappedCategoriesHintProps {
  groupId: string;
  onGoToMapping: () => void;
}

export const UnmappedCategoriesHint: FC<UnmappedCategoriesHintProps> = ({
  groupId,
  onGoToMapping,
}) => {
  const groupT = useTranslations('group');
  const hasUnmapped = useHasUnmappedCategories(groupId);

  if (!hasUnmapped) return null;

  return (
    <Hint className="mb-2">
      {groupT('unmappedCategoriesHint')}
      <Button variant="outline" size="sm" className="mt-2 flex" onClick={onGoToMapping}>
        {groupT('unmappedCategoriesGoToMapping')}
      </Button>
    </Hint>
  );
};
