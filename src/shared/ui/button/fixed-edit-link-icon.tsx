import Link from 'next/link';
import { Button } from './button';
import { Pencil } from 'lucide-react';
import { cn } from '@/shared/lib/shadcn/utils/utils';

interface FixedEditLinkIconProps {
  link: string;
  wrapperClassName?: string;
}

export const FixedEditLinkIcon: React.FC<FixedEditLinkIconProps> = ({ link, wrapperClassName }) => {
  return (
    <div
      className={cn(
        'fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))]',
        wrapperClassName,
      )}
    >
      <Link href={link}>
        <Button size={'icon'} variant={'primary'}>
          <Pencil />
        </Button>
      </Link>
    </div>
  );
};
