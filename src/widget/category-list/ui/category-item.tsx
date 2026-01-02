import { Category } from '@/shared/api/queries/categories/types';
import { iconCategoryFromBackendMap } from '@/shared/lib';
import { ROUTES } from '@/shared/model/routes';
import Link from 'next/link';

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <Link
      href={ROUTES.CATEGORY_DETAIL.replace(':id', category?.id)}
      className={
        'text-center h-auto flex flex-col items-center py-2 border border-transparent border-solid rounded-2xl'
      }
    >
      <div
        className="h-10 w-10 rounded-full flex items-center justify-center"
        style={{ background: category.color }}
      >
        {iconCategoryFromBackendMap?.[category.icon]}
      </div>
      <div className="w-full">
        <div key={category.id} className="text-xs truncate">
          {category.name}
        </div>
      </div>
    </Link>
  );
};
