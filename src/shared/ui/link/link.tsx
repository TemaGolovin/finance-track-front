import Link from 'next/link';
import { Button } from '../button/button';

interface LinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  buttonProps?: React.ComponentProps<typeof Button>;
}

export const LinkButton = ({ children, buttonProps, ...props }: LinkProps) => {
  return (
    <Link target="_blank" rel="noopener noreferrer" {...props}>
      <Button variant="ghost" size="sm" className="underline" {...buttonProps}>
        {children}
      </Button>
    </Link>
  );
};
