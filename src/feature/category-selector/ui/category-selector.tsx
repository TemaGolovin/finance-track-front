import { CategoryItem } from '@/entity/category';
import { useCategories } from '@/shared/api/queries/categories';
import { Button } from '@/shared/lib';
import { cn } from '@/shared/lib/shadcn/utils/utils';

interface CategorySelectorProps {
  type?: 'INCOME' | 'EXPENSE';
  selectedCategoryId?: string;
  setSelectedCategoryId: (id: string) => void;
  error?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  type,
  selectedCategoryId,
  setSelectedCategoryId,
  error,
}) => {
  const { data: categories } = useCategories({ type });

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 w-full gap-x-2 gap-y-1 justify-center max-h-[40dvh] overflow-y-auto',
          {
            'bg-destructive/15 border-destructive/50 border border-solid rounded-lg': !!error,
          },
        )}
      >
        {categories?.map((category) => (
          <Button
            key={category.id}
            className={cn(
              'text-center h-auto flex flex-col items-center py-2 border border-transparent border-solid transition-colors',
              { 'p-0': selectedCategoryId === category.id },
            )}
            style={{
              background: selectedCategoryId === category.id ? category.color : undefined,
            }}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <CategoryItem
              nameClasses={cn({
                'overflow-visible wrap-anywhere whitespace-pre-wrap':
                  selectedCategoryId === category.id,
              })}
              color={category.color}
              icon={category.icon}
              name={category.name}
            />
          </Button>
        ))}
      </div>
      <div className="text-xs text-destructive h-3">{error}</div>
    </>
  );
};
