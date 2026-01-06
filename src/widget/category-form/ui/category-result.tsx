import { useFormContext, useWatch } from 'react-hook-form';
import { CategoryFormType } from '../model/schema';
import { CategoryItem } from '@/entity/category';
import { BaseCard } from '@/shared/ui';
import { useTranslations } from 'next-intl';

export const CategoryResult = () => {
  const { control } = useFormContext<CategoryFormType>();

  const categoryT = useTranslations('category');

  const icon = useWatch({ control, name: 'icon' });
  const color = useWatch({ control, name: 'color' });
  const name = useWatch({ control, name: 'name' });

  return (
    <BaseCard title={categoryT('preview')}>
      <div className="flex justify-center items-center">
        <div className="max-w-30 flex flex-col items-center">
          <CategoryItem
            color={color}
            icon={icon}
            name={name}
            iconClasses="w-12 h-12"
            // nameClasses="text-sm"
          />
        </div>
      </div>
    </BaseCard>
  );
};
