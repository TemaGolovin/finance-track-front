'use client';

import { useAboutMe } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button, Dropdown } from '@/shared/ui';
import { CircleUser, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

type ProfileMenuId = 'profile' | 'settings';

export const ProfileAction = () => {
  const { data: user, isLoading } = useAboutMe();
  const tSidebar = useTranslations('sidebar');
  const tProfile = useTranslations('profile');
  const router = useRouter();
  const pathname = usePathname();

  if (!user || isLoading) {
    return null;
  }

  const handleSelect = (id: ProfileMenuId) => {
    const href = id === 'settings' ? ROUTES.SETTINGS : ROUTES.PROFILE;
    if (pathname !== href) {
      router.push(href);
    }
  };

  return (
    <Dropdown<ProfileMenuId>
      align="end"
      trigger={
        <Button
          size="icon"
          variant="outline"
          type="button"
          title={tSidebar('profile')}
          aria-label={tSidebar('profile')}
          className="bg-linear-to-t from-secondary/60 to-background/70"
        >
          <CircleUser className="w-6 h-6" />
        </Button>
      }
      list={[
        {
          id: 'profile',
          label: tSidebar('profile'),
          icon: <CircleUser className="h-4 w-4" />,
        },
        {
          id: 'settings',
          label: tProfile('settingsLinkTitle'),
          icon: <Settings className="h-4 w-4" />,
        },
      ]}
      onSelect={handleSelect}
    />
  );
};