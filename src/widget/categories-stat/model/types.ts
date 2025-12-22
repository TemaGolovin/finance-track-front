export interface CategoryStatRes {
  totalSum: number;
  categories: CategoryInStat[];
}

export interface CategoryInStat {
  id: string;
  name: string;
  sum: number;
  proportion: number;
}
