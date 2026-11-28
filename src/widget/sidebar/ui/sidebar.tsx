'use client';

import { useAboutMe } from '@/shared/api/queries/auth';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { Sheet } from '@/shared/ui';
import { Ellipsis } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getSidebarGroups, type SidebarItem } from '../lib/sidebar-items';

const PRIMARY_IDS = new Set(['main', 'operations', 'categories', 'groups']);

const isNavItemActive = (pathname: string, link: string) =>
  pathname === link || pathname.startsWith(`${link}/`);

export const Sidebar = () => {
  const sidebarT = useTranslations('sidebar');
  const pathname = usePathname();
  const { isSuccess, isLoading } = useAboutMe();
  const [moreOpen, setMoreOpen] = useState(false);

  if (!isSuccess || isLoading) {
    return null;
  }

  const groups = getSidebarGroups(sidebarT);
  const allItems = groups.flatMap((group) => group.items);
  const primary = allItems.filter((item) => PRIMARY_IDS.has(item.id));
  const overflow = allItems.filter((item) => !PRIMARY_IDS.has(item.id));
  const isActive = (link: string) => isNavItemActive(pathname, link);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md',
        'pb-[max(0.5rem,env(safe-area-inset-bottom))]',
      )}
      aria-label={sidebarT('menu')}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between gap-1 px-2 pt-1.5">
        {primary.map((item) => (
          <DockItem key={item.id} item={item} active={isActive(item.link)} />
        ))}

        <div className="flex min-w-0 flex-1 [&_button]:flex [&_button]:h-full [&_button]:w-full [&_button]:min-w-0">
          <Sheet
            title={sidebarT('more')}
            isOpen={moreOpen}
            onOpenChange={setMoreOpen}
            trigger={
              <span
                className={cn(
                  'flex w-full flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px]',
                  'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Ellipsis className="size-5" />
                <span className="truncate">{sidebarT('more')}</span>
              </span>
            }
          >
            <div className="flex flex-col gap-1 pt-2">
              {overflow.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm',
                    isActive(item.link)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted',
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

type DockItemProps = {
  item: SidebarItem;
  active: boolean;
};

const DockItem = ({ item, active }: DockItemProps) => (
  <Link
    href={item.link}
    className={cn(
      'flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] transition-colors',
      active
        ? 'bg-primary/10 font-medium text-primary'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
    )}
  >
    <span className="[&_svg]:size-5">{item.icon}</span>
    <span className="w-full truncate text-center">{item.title}</span>
  </Link>
);
