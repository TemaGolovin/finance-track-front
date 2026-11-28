'use client';

import { useGroups } from '@/shared/api/queries/groups';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { Button, Drawer } from '@/shared/ui';
import { ChevronDownIcon, UserRoundIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useGroupSelector } from '../model/use-group-selector';
import { MemberTags } from './member-tags';

type ScopeOption = {
  id: string;
  label: string;
  kind: 'personal' | 'group';
  memberNames: string[];
};

export const GroupSelector = () => {
  const t = useTranslations('common');
  const scopeT = useTranslations('groupScope');
  const { data: groups } = useGroups();
  const { selectedTabId, setSelectedGroupId, PERSONAL_KEY } = useGroupSelector();

  if (!groups || groups.length === 0) return null;

  const options: ScopeOption[] = [
    {
      id: PERSONAL_KEY,
      label: t('personal'),
      kind: 'personal',
      memberNames: [],
    },
    ...groups.map((group) => ({
      id: group.id,
      label: group.name,
      kind: 'group' as const,
      memberNames: [
        ...new Set([group.creator.name, ...group.users.map((u) => u.user.name)].filter(Boolean)),
      ],
    })),
  ];

  const selected = options.find((o) => o.id === selectedTabId) ?? options[0];
  if (!selected) return null;

  const Icon = selected.kind === 'personal' ? UserRoundIcon : UsersIcon;
  const subtitle =
    selected.kind === 'personal'
      ? scopeT('personalSubtitle')
      : selected.memberNames.length > 0
        ? (() => {
            const visible = selected.memberNames.slice(0, 2);
            const rest = selected.memberNames.length - visible.length;
            return (
              visible.join(', ') + (rest > 0 ? ` ${scopeT('membersMore', { count: rest })}` : '')
            );
          })()
        : scopeT('sharedBudget');

  const select = (id: string) => {
    setSelectedGroupId(id === PERSONAL_KEY ? null : id);
  };

  return (
    <Drawer
      title={scopeT('title')}
      description={scopeT('description')}
      trigger={
        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors',
            selected.kind === 'personal'
              ? 'border-emerald-500/30 bg-emerald-500/10'
              : 'border-sky-500/30 bg-sky-500/10',
          )}
        >
          <div
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-lg',
              selected.kind === 'personal'
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                : 'bg-sky-500/20 text-sky-700 dark:text-sky-300',
            )}
          >
            <Icon className="size-4" strokeWidth={2.25} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-tight mb-0.5">{selected.label}</p>
            <p className="text-muted-foreground truncate text-[11px] leading-tight">{subtitle}</p>
          </div>
          <ChevronDownIcon className="text-muted-foreground size-4 shrink-0" />
        </button>
      }
      renderContent={(onClose) => (
        <div className="flex flex-col gap-1.5 pb-2">
          {options.map((option) => {
            const active = option.id === selected.id;
            const OptionIcon = option.kind === 'personal' ? UserRoundIcon : UsersIcon;
            return (
              <Button
                key={option.id}
                type="button"
                variant={active ? 'primary' : 'outline'}
                className="h-auto items-start justify-start gap-2.5 whitespace-normal px-3 py-2.5"
                onClick={() => {
                  select(option.id);
                  onClose();
                }}
              >
                <OptionIcon className="size-4 shrink-0" />
                <span className="flex min-w-0 flex-1 flex-col items-start gap-1 overflow-hidden">
                  <span className="font-medium">{option.label}</span>
                  {option.kind === 'group' && option.memberNames.length > 0 && (
                    <MemberTags names={option.memberNames} active={active} />
                  )}
                  {option.kind === 'personal' && (
                    <span
                      className={cn('text-[11px]', active ? 'opacity-80' : 'text-muted-foreground')}
                    >
                      {scopeT('personalSubtitle')}
                    </span>
                  )}
                </span>
              </Button>
            );
          })}
        </div>
      )}
    />
  );
};
