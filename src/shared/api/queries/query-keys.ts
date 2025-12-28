export const operations = {
  all: ['operations'],
  byId: (id: string) => [...operations.all, id],
} as const;

export const categories = {
  all: ['categories'],
  categoriesParams: (params?: { type?: 'INCOME' | 'EXPENSE' }) => [...categories.all, params],
  categoriesStat: ['categories', 'stat'],
  categoriesStatParams: (params?: {
    startDate?: string;
    endDate?: string;
    operationType?: 'INCOME' | 'EXPENSE';
  }) => [...categories.categoriesStat, params],
  byId: (id: string) => [...categories.all, id],
} as const;
