import Link from 'next/link';
import { Button } from './button';
import { PlusIcon } from 'lucide-react';

interface FixedPlusLinkButtonProps {
  link: string;
}

export const FixedPlusLinkButton: React.FC<FixedPlusLinkButtonProps> = ({ link }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <Link href={link}>
        <Button size={'icon'} variant={'primary'}>
          <PlusIcon />
        </Button>
      </Link>
    </div>
  );
};
