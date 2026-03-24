'use client';

import { Group } from '@/shared/api/queries/groups';
import { useAboutMe } from '@/shared/api/queries/auth';
import { Tabs } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { GroupInfoTab } from './group-info-tab';
import { GroupCategoryConnectForm } from '@/widget/group-category-connect';
import { GroupCategoryManage } from '@/widget/group-category-manage';

type TabId = 'info' | 'mapping' | 'categories';

interface GroupDetailProps {
  group: Group | undefined;
  isLoading: boolean;
}

export const GroupDetail: FC<GroupDetailProps> = ({ group, isLoading }) => {
  const groupT = useTranslations('group');
  const { data: me } = useAboutMe();

  const [activeTab, setActiveTab] = useState<TabId>('info');

  const isCreator = !!me?.data?.id && me.data.id === group?.creatorId;

  const tabsInfo = [
    {
      id: 'info' as TabId,
      title: groupT('tabInfo'),
      content: <GroupInfoTab group={group} isLoading={isLoading} isCreator={isCreator} />,
    },
    {
      id: 'mapping' as TabId,
      title: groupT('tabMapping'),
      content: group ? <GroupCategoryConnectForm groupId={group.id} mode="tab" /> : null,
    },
    ...(isCreator && group
      ? [
          {
            id: 'categories' as TabId,
            title: groupT('tabCategories'),
            content: <GroupCategoryManage groupId={group.id} />,
          },
        ]
      : []),
  ];

  return (
    <div className="mt-2">
      <Tabs<TabId> tabsInfo={tabsInfo} selectedId={activeTab} onSelect={setActiveTab} />
    </div>
  );
};
