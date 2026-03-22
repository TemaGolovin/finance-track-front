'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConnectGroupCategories, useGroupCategories } from '@/shared/api/queries/groups';
import { useCategories } from '@/shared/api/queries/categories';
import { ROUTES } from '@/shared/model/routes';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useGroupCategoryConnect = (groupId: string) => {
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

    for (const gc of groupCategories) {
      if (gc.connectedPersonalCategoryId) {
        result[gc.id] = gc.connectedPersonalCategoryId;
        continue;
      }

      if (gc.defaultKey) {
        const match = personalCategories.find(
          (pc) => pc.defaultKey === gc.defaultKey && pc.categoryType === gc.categoryType,
        );
        if (match) {
          result[gc.id] = match.id;
        }
      }
    }

    return result;
  }, [groupCategories, personalCategories]);

  const mapping = useMemo(() => ({ ...autoMapping, ...userMapping }), [autoMapping, userMapping]);

  const setPersonalCategory = (groupCategoryId: string, personalCategoryId: string) => {
    setUserMapping((prev) => ({ ...prev, [groupCategoryId]: personalCategoryId }));
  };

  const groupDetailRoute = ROUTES.GROUP_DETAIL.replace(':id', groupId);

  const handleSubmit = async () => {
    const relatedCategories = Object.entries(mapping)
      .filter(([, personalCategoryId]) => !!personalCategoryId)
      .map(([groupCategoryId, personalCategoryId]) => ({ groupCategoryId, personalCategoryId }));

    if (relatedCategories.length === 0) {
      router.push(groupDetailRoute);
      return;
    }

    await toast.promise(connectCategories({ groupId, relatedCategories }), {
      loading: t('connectCategoriesLoading'),
      success: t('connectCategoriesSuccess'),
      error: (err) => err?.message || t('connectCategoriesError'),
    });

    router.push(groupDetailRoute);
  };

  const handleSkip = () => {
    router.push(groupDetailRoute);
  };

  return {
    groupCategories,
    personalCategories,
    isLoading: isLoadingGroupCategories || isLoadingPersonalCategories,
    isPending,
    mapping,
    setPersonalCategory,
    handleSubmit,
    handleSkip,
  };
};
