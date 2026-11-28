'use client';
import { useAboutMe } from '@/shared/api/queries/auth';
import { Button, Sheet } from '@/shared/ui';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { getSidebarGroups } from '../lib/sidebar-items';

const linkClassName =
  'flex gap-2 justify-start text-lg font-normal bg-card w-full rounded-md px-3 pt-2 pb-1.5';

export const Sidebar = () => {
  const sidebarT = useTranslations('sidebar');

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { isSuccess, isLoading } = useAboutMe();

  if (!isSuccess || isLoading) {
    return null;
  }

  const groups = getSidebarGroups(sidebarT);
  const workspaceGroup = groups.find((group) => group.id === 'workspace');
  const serviceGroup = groups.find((group) => group.id === 'service');

  return (
    <Sheet
      title="Menu"
      isOpen={isOpenSidebar}
      onOpenChange={setIsOpenSidebar}
      footer={
        serviceGroup ? (
          <div className="flex flex-col gap-1 w-full">
            {serviceGroup.items.map((item) => (
              <Link
                key={item.id}
                className={linkClassName}
                href={item.link}
                onClick={() => setIsOpenSidebar(false)}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        ) : null
      }
      trigger={
        <Button
          asChild
          size="icon"
          className="bg-linear-to-t from-secondary/60 to-background/70"
          variant="outline"
        >
          <Menu />
        </Button>
      }
    >
      {workspaceGroup ? (
        <div className="flex flex-col gap-1">
          {workspaceGroup.items.map((item) => (
            <Link
              key={item.id}
              className={linkClassName}
              href={item.link}
              onClick={() => setIsOpenSidebar(false)}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}
    </Sheet>
  );
};
