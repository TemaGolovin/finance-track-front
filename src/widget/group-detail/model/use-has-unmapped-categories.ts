import { useCategories } from '@/shared/api/queries/categories';
import { useGroupCategories } from '@/shared/api/queries/groups';

export const useHasUnmappedCategories = (groupId: string) => {
  const { data: groupCategories, isLoading: isLoadingGroupCategories } = useGroupCategories({
    groupId,
  });
  const { data: personalCategories, isLoading: isLoadingPersonalCategories } = useCategories();

  const isLoading = isLoadingGroupCategories || isLoadingPersonalCategories;

  if (isLoading || !groupCategories || !personalCategories) return false;

  const connectedPersonalIds = new Set(
    groupCategories.flatMap((gc) =>
      gc.connectedPersonalCategoryId ? [gc.connectedPersonalCategoryId] : [],
    ),
  );

  const hasUnmappedGroupCategory = groupCategories.some((gc) => !gc.connectedPersonalCategoryId);
  const hasUnmappedPersonalCategory = personalCategories.some(
    (pc) => !connectedPersonalIds.has(pc.id),
  );

  return hasUnmappedGroupCategory || hasUnmappedPersonalCategory;
};
