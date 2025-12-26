import { Button, iconCategoryFromBackendMap } from '@/shared/lib';
import { useCategories } from '../api/use-categories';
import { cn } from '@/shared/lib/shadcn/utils/utils';

interface CategorySelectorProps {
  type?: 'INCOME' | 'EXPENSE';
  selectedCategoryId?: string;
  setSelectedCategoryId: (id: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  type,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const { data: categories } = useCategories({ type });

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 w-full gap-x-2 gap-y-1 justify-center">
      {categories?.map((category) => (
        <Button
          key={category.id}
          className={cn(
            'text-center h-auto flex flex-col items-center py-2 border border-transparent border-solid',
            {
              'bg-primary/20 dark:bg-primary/15 border border-primary/50 border-solid':
                category.id === selectedCategoryId,
            },
          )}
          onClick={() => setSelectedCategoryId(category.id)}
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
        </Button>
      ))}
    </div>
  );
};
