import { Skeleton } from '@/shared/ui';
import { FC, ReactNode } from 'react';

interface SkeletonInfoStr {
  isLoading: boolean;
  children: ReactNode;
}

export const SkeletonInfoStr: FC<SkeletonInfoStr> = ({ isLoading, children }) =>
  isLoading ? <Skeleton className="w-40 h-8 bg-base-300" /> : children;
