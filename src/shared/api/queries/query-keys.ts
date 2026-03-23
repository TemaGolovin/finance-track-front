export const operations = {
  all: ['operations'],
  operationsParams: (params?: {
    startDate?: string;
    endDate?: string;
    operationType?: 'INCOME' | 'EXPENSE';
    categoryId?: string;
  }) => [...operations.all, params],
  detail: (id: string) => [...operations.all, id],
} as const;

export const categories = {
  all: ['categories'],
  detail: (id: string) => [...categories.all, id],
  categoriesParams: (params?: { type?: 'INCOME' | 'EXPENSE' }) => [...categories.all, params],
  categoriesStat: ['categories', 'stat'],
  categoriesStatParams: (params?: {
    startDate?: string;
    endDate?: string;
    operationType?: 'INCOME' | 'EXPENSE';
  }) => [...categories.categoriesStat, params],
  byId: (id: string) => [...categories.all, id],
} as const;

export const auth = {
  me: ['me'],
} as const;

export const groups = {
  all: ['groups'],
  detail: (id: string) => [...groups.all, id],
  invitations: (id: string) => [...groups.detail(id), 'invitations'],
  categories: (id: string) => [...groups.detail(id), 'categories'],
  stat: (
    id: string,
    params?: { operationType?: 'INCOME' | 'EXPENSE'; startDate?: string; endDate?: string },
  ) => [...groups.detail(id), 'stat', params],
  operations: (
    id: string,
    params?: {
      startDate?: string;
      endDate?: string;
      operationType?: 'INCOME' | 'EXPENSE';
      categoryId?: string;
    },
  ) => [...groups.detail(id), 'operations', params],
} as const;

export const users = {
  search: (name: string) => ['users', 'search', name],
} as const;

export const invitations = {
  all: ['invitations'],
} as const;
