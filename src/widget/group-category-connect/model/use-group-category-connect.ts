'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConnectGroupCategories, useGroupCategories } from '@/shared/api/queries/groups';
import { useCategories } from '@/shared/api/queries/categories';
import { ROUTES } from '@/shared/model/routes';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface UseGroupCategoryConnectOptions {
  onAfterAction?: () => void;
}

export const useGroupCategoryConnect = (
  groupId: string,
  options?: UseGroupCategoryConnectOptions,
) => {
  const router = useRouter();
  const t = useTranslations('group');

  const { data: groupCategories, isLoading: isLoadingGroupCategories } = useGroupCategories({
    groupId,
  });
  const { data: personalCategories, isLoading: isLoadingPersonalCategories } = useCategories();
  const { mutateAsync: connectCategories, isPending } = useConnectGroupCategories();

  const [userMapping, setUserMapping] = useState<Record<string, string>>({});

  const autoMapping = useMemo<Record<string, string>>(() => {
    if (!groupCategories || !personalCategories) return {};

    const result: Record<string, string> = {};
    const usedPersonalIds = new Set<string>();

    for (const gc of groupCategories) {
      if (gc.connectedPersonalCategoryId) {
        result[gc.id] = gc.connectedPersonalCategoryId;
        usedPersonalIds.add(gc.connectedPersonalCategoryId);
        continue;
      }

      if (gc.defaultKey) {
        const match = personalCategories.find(
          (pc) =>
            pc.defaultKey === gc.defaultKey &&
            pc.categoryType === gc.categoryType &&
            !usedPersonalIds.has(pc.id),
        );
        if (match) {
          result[gc.id] = match.id;
          usedPersonalIds.add(match.id);
        }
      }
    }

    return result;
  }, [groupCategories, personalCategories]);

  const mapping = useMemo(() => ({ ...autoMapping, ...userMapping }), [autoMapping, userMapping]);

  const setPersonalCategory = (groupCategoryId: string, personalCategoryId: string) => {
    setUserMapping((prev) => {
      const mergedBefore = { ...autoMapping, ...prev };
      const next = { ...prev };

      if (personalCategoryId) {
        for (const gc of groupCategories ?? []) {
          if (gc.id === groupCategoryId) continue;
          if (mergedBefore[gc.id] === personalCategoryId) {
            next[gc.id] = '';
          }
        }
      }

      next[groupCategoryId] = personalCategoryId;
      return next;
    });
  };

  const getPersonalIdsUsedElsewhere = (forGroupCategoryId: string) => {
    const used = new Set<string>();
    for (const gc of groupCategories ?? []) {
      if (gc.id === forGroupCategoryId) continue;
      const id = mapping[gc.id];
      if (id) used.add(id);
    }
    return used;
  };

  const groupDetailRoute = ROUTES.GROUP_DETAIL.replace(':id', groupId);

  const navigate = () => {
    if (options?.onAfterAction) {
      options.onAfterAction();
    } else {
      router.push(groupDetailRoute);
    }
  };

  const handleSubmit = async () => {
    if (!groupCategories?.length) {
      navigate();
      return;
    }

    const relatedCategories = groupCategories.map((gc) => ({
      groupCategoryId: gc.id,
      personalCategoryId: mapping[gc.id] ? mapping[gc.id]! : null,
    }));

    await toast.promise(connectCategories({ groupId, relatedCategories }), {
      loading: t('connectCategoriesLoading'),
      success: t('connectCategoriesSuccess'),
      error: (err) => err?.message || t('connectCategoriesError'),
    });

    navigate();
  };

  const handleSkip = () => {
    navigate();
  };

  return {
    groupCategories,
    personalCategories,
    isLoading: isLoadingGroupCategories || isLoadingPersonalCategories,
    isPending,
    mapping,
    setPersonalCategory,
    getPersonalIdsUsedElsewhere,
    handleSubmit,
    handleSkip,
  };
};
