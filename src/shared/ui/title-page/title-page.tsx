import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '..';
import type { RoutesType } from '@/shared/model/routes';
import Link from 'next/link';

interface TitlePageProps {
  title: string;
  onBackBtnClick?: () => void;
  backLink?: RoutesType | string;
  isLoading?: boolean;
}

export const TitlePage: React.FC<TitlePageProps> = ({ title, isLoading, backLink }) => {
  return (
    <div className="flex items-center gap-2 py-3 -mx-2 px-3 rounded-b-xl bg-linear-to-b dark:from-secondary/30 from-secondary/45 to-secondary/10">
      {backLink && (
        <Link
          href={backLink}
          className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
        </Link>
      )}
      <h1 className="text-lg font-semibold tracking-tight text-foreground truncate">
        {isLoading ? <Skeleton className="h-6 w-40" /> : title}
      </h1>
    </div>
  );
};
