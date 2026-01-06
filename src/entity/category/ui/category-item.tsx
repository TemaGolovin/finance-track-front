import { IconCategory, iconCategoryFromBackendMap } from '@/shared/lib';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { FC } from 'react';

interface CategoryItemProps {
  color: string;
  icon: IconCategory;
  name: string;
  iconClasses?: string;
  nameClasses?: string;
}

export const CategoryItem: FC<CategoryItemProps> = ({
  icon,
  color,
  name,
  iconClasses,
  nameClasses,
}) => {
  return (
    <>
      <div
        className={cn('h-10 w-10 rounded-full flex items-center justify-center', [iconClasses])}
        style={{ background: color }}
      >
        {iconCategoryFromBackendMap?.[icon]}
      </div>
      <div className={cn('w-full text-xs', [nameClasses])}>
        <div className="truncate">{name}</div>
      </div>
    </>
  );
};
