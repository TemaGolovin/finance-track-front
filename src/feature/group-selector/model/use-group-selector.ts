import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PERSONAL_KEY = 'personal';

export const useGroupSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  const rawValue = currentParams.get('groupId');
  const selectedGroupId = rawValue && rawValue !== PERSONAL_KEY ? rawValue : null;

  const setSelectedGroupId = (groupId: string | null) => {
    if (groupId) {
      currentParams.set('groupId', groupId);
    } else {
      currentParams.delete('groupId');
    }
    router.push(`?${currentParams.toString()}`);
  };

  const selectedTabId = selectedGroupId ?? PERSONAL_KEY;

  return { selectedGroupId, selectedTabId, setSelectedGroupId, PERSONAL_KEY };
};
