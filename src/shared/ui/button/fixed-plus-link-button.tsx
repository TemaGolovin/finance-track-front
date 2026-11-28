import Link from 'next/link';
import { Button } from './button';
import { PlusIcon } from 'lucide-react';

interface FixedPlusLinkButtonProps {
  link: string;
}

export const FixedPlusLinkButton: React.FC<FixedPlusLinkButtonProps> = ({ link }) => {
  return (
    <div className="fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))]">
      <Link href={link}>
        <Button size={'icon'} variant={'primary'}>
          <PlusIcon />
        </Button>
      </Link>
    </div>
  );
};
