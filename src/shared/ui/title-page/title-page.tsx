import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '..';
import { RoutesType } from '@/shared/model/routes';
import Link from 'next/link';

interface TitlePageProps {
  title: string;
  onBackBtnClick?: () => void;
  backLink?: RoutesType;
  isLoading?: boolean;
}

export const TitlePage: React.FC<TitlePageProps> = ({ title, isLoading, backLink }) => {
  return (
    <div
      className={
        'font-bold flex items-center gap-3 bg-secondary text-secondary-foreground/80 p-2 -mx-2 px-3'
      }
    >
      {backLink && (
        <Link href={backLink} className="text-secondary-foreground">
          <ArrowLeft />
        </Link>
      )}
      <div>{isLoading ? <Skeleton className="h-6 w-40 bg-background/50" /> : title}</div>
    </div>
  );
};
