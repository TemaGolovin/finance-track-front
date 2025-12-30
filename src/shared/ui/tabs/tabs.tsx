import { TabsContent, TabsList, TabsTrigger, Tabs as TabsShadcn } from '@/shared/lib/shadcn/tabs';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { ReactNode } from 'react';

interface TabsProps<TabIdType> {
  tabsInfo: {
    id: TabIdType;
    title: ReactNode;
    content?: ReactNode;
    icon?: ReactNode;
  }[];
  selectedId: TabIdType;
  onSelect: (id: TabIdType) => void;
  size?: 'sm' | 'md';
}

export const Tabs = <TabIdType extends string>({
  tabsInfo,
  selectedId,
  onSelect,
  size = 'md',
}: TabsProps<TabIdType>) => {
  return (
    <TabsShadcn defaultValue={selectedId || tabsInfo[0].id}>
      <TabsList
        className={cn('w-full', {
          'h-10': size === 'md',
          'h-8': size === 'sm',
        })}
      >
        {tabsInfo?.map(({ id, title, icon }) => (
          <TabsTrigger
            className={cn(
              'data-[state=active]:border-primary/50 data-[state=active]:bg-primary/10 dark:data-[state=active]:border-primary/50 dark:data-[state=active]:bg-primary/10',
              {
                'text-xs': size === 'sm',
                'text-md': size === 'md',
              },
            )}
            key={id}
            value={id}
            onClick={() => onSelect(id)}
          >
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsInfo?.map(
        ({ id, content }) =>
          content && (
            <TabsContent key={id} value={id}>
              {content}
            </TabsContent>
          ),
      )}
    </TabsShadcn>
  );
};
