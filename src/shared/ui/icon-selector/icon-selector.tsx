import { Button, iconCategoryFromBackendMap, iconsKeys } from '@/shared/lib';
import { Drawer } from '../drawer/drawer';
import { FC } from 'react';
import { useTranslations } from 'next-intl';

interface IconSelectorProps {
  selectedIcon: (typeof iconsKeys)[number];
  setSelectedIcon: (icon: (typeof iconsKeys)[number]) => void;
}

export const IconSelector: FC<IconSelectorProps> = ({ selectedIcon, setSelectedIcon }) => {
  const categoryT = useTranslations('category');
  return (
    <Drawer
      title={categoryT('iconPicker')}
      trigger={
        <Button
          variant={'outline'}
          size={!selectedIcon ? 'default' : 'icon'}
          className={!selectedIcon ? 'w-full' : ''}
        >
          {selectedIcon ? iconCategoryFromBackendMap[selectedIcon] : categoryT('pickIcon')}
        </Button>
      }
      renderContent={(onClose) => (
        <div className="grid grid-cols-5">
          {iconsKeys.map((icon) => (
            <button
              onClick={() => {
                setSelectedIcon(icon);
                onClose();
              }}
              type="button"
              key={icon}
              className="h-12 w-12 rounded-full flex items-center justify-center"
            >
              {iconCategoryFromBackendMap[icon]}
            </button>
          ))}
        </div>
      )}
    />
  );
};
