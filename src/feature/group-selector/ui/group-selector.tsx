import { Button, DropdownRadio } from '@/shared/ui';
import { useGroups } from '@/shared/api/queries/groups';
import { useGroupSelector } from '../model/use-group-selector';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from 'lucide-react';

export const GroupSelector = () => {
  const t = useTranslations('common');
  const { data: groups } = useGroups();
  const { selectedGroupId, selectedTabId, setSelectedGroupId, PERSONAL_KEY } = useGroupSelector();

  if (!groups || groups.length === 0) return null;

  const list = [
    { id: PERSONAL_KEY, label: t('personal') },
    ...groups.map((group) => ({ id: group.id, label: group.name })),
  ];

  const selectedLabel = selectedGroupId
    ? (groups.find((g) => g.id === selectedGroupId)?.name ?? t('personal'))
    : t('personal');

  return (
    <DropdownRadio
      list={list}
      selectedId={selectedTabId}
      onSelect={(id) => setSelectedGroupId(id === PERSONAL_KEY ? null : id)}
      trigger={
        <Button variant="outline" className="w-full justify-between">
          {selectedLabel}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      }
    />
  );
};
