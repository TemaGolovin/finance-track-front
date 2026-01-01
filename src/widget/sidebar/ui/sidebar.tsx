'use client';
import { Button, Sheet } from '@/shared/ui';
import { Menu } from 'lucide-react';
import { getSidebarItems } from '../lib/sidebar-items';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useAboutMe } from '@/shared/api/queries/auth';

export const Sidebar = () => {
  const sidebarT = useTranslations('sidebar');

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { isSuccess, isLoading } = useAboutMe();

  if (!isSuccess || isLoading) {
    return null;
  }

  return (
    <Sheet
      title="Menu"
      isOpen={isOpenSidebar}
      onOpenChange={setIsOpenSidebar}
      trigger={
        <Button asChild size="icon" variant="outline">
          <Menu />
        </Button>
      }
    >
      <div className="flex flex-col gap-1">
        {getSidebarItems(sidebarT).map((item) => (
          <Link
            key={item.id}
            className="flex gap-2 justify-start text-lg font-normal bg-card w-full rounded-md px-3 pt-2 pb-1.5"
            href={item.link}
            onClick={() => setIsOpenSidebar(false)}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </Sheet>
  );
};
