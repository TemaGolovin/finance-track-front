export const operations = {
  all: ['operations'],
  byId: (id: string) => [...operations.all, id],
} as const;
