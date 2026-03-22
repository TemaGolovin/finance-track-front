import { cn } from '@/shared/lib/shadcn/utils/utils';
import { Info } from 'lucide-react';
import type { FC, ReactNode } from 'react';

interface HintProps {
  children: ReactNode;
  className?: string;
}

export const Hint: FC<HintProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-md bg-accent/20 border border-accent px-3 py-2 text-sm text-foreground/70',
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-foreground/50" />
      <span>{children}</span>
    </div>
  );
};
