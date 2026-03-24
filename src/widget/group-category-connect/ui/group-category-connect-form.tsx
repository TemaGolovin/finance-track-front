'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button, DropdownRadio, Hint, Skeleton } from '@/shared/ui';
import { useGroupCategoryConnect } from '../model/use-group-category-connect';
import { BanknoteArrowDown, BanknoteArrowUp, ChevronDown } from 'lucide-react';

interface GroupCategoryConnectFormProps {
  groupId: string;
  mode?: 'page' | 'tab';
}

export const GroupCategoryConnectForm: FC<GroupCategoryConnectFormProps> = ({
  groupId,
  mode = 'page',
}) => {
  const t = useTranslations('group');
  const commonT = useTranslations('common');

  const {
    groupCategories,
    personalCategories,
    isLoading,
    isPending,
    mapping,
    setPersonalCategory,
    handleSubmit,
    handleSkip,
  } = useGroupCategoryConnect(groupId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 py-2">
        {['sk-1', 'sk-2', 'sk-3', 'sk-4'].map((key) => (
          <Skeleton key={key} className="h-16 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 py-2 ${mode === 'page' ? 'pb-16' : ''}`}>
      <Hint>{t('connectCategoriesDescription')}</Hint>
      <div className="grid grid-cols-2 gap-2 items-center px-2">
        <div className="grid grid-cols-subgrid col-span-full gap-0 py-2 px-1 text-center bg-muted/60 rounded-lg">
          <div className="text-sm font-semibold">Категория группы</div>
          <div className="text-sm font-semibold">Ваша категория</div>
        </div>
        {groupCategories?.map((groupCategory) => {
          const compatiblePersonal =
            personalCategories?.filter((pc) => pc.categoryType === groupCategory.categoryType) ??
            [];

          const selectedId = mapping[groupCategory.id] ?? '';
          const selectedLabel =
            compatiblePersonal.find((pc) => pc.id === selectedId)?.name ?? t('notConnected');

          return (
            <div
              className="grid grid-cols-subgrid col-span-full items-center border-b border-muted pb-2"
              key={groupCategory.id}
            >
              <div className="text-sm flex gap-1.5 flex-wrap items-center">
                {groupCategory.name}
                {groupCategory.categoryType === 'EXPENSE' ? (
                  <BanknoteArrowDown className="w-4.5 h-4.5 text-destructive/80" />
                ) : (
                  <BanknoteArrowUp className="w-4.5 h-4.5 text-success/80" />
                )}
              </div>
              <DropdownRadio
                selectedId={selectedId}
                onSelect={(id) => setPersonalCategory(groupCategory.id, id)}
                list={compatiblePersonal.map((pc) => ({ id: pc.id, label: pc.name }))}
                trigger={
                  <Button
                    variant="outline"
                    size={'sm'}
                    className="flex items-center gap-1 font-semibold text-foreground/80 text-sm justify-between"
                  >
                    <span className="truncate">{selectedLabel}</span>
                    <ChevronDown className="w-4 h-4 text-foreground/50" />
                  </Button>
                }
              />
            </div>
          );
        })}
      </div>

      <div
        className={
          mode === 'tab'
            ? 'flex gap-2 mt-2'
            : 'flex gap-2 mt-2 fixed bottom-4 inset-x-2'
        }
      >
        {mode === 'page' && (
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleSkip}
            disabled={isPending}
          >
            {t('connectCategoriesSkip')}
          </Button>
        )}
        <Button className="flex-1" variant={'primary'} onClick={handleSubmit} disabled={isPending}>
          {commonT('save')}
        </Button>
      </div>
    </div>
  );
};
