import { ReactNode } from 'react';

interface SecondaryCardProps {
  title: string;
  children: ReactNode;
}

export const SecondaryCard: React.FC<SecondaryCardProps> = ({ title, children }) => {
  return (
    <div className="bg-card rounded-md p-2">
      <div className="text-foreground/60 mb-1 text-sm">{title}</div>
      <div className="text-lg font-semibold text-foreground/80">{children}</div>
    </div>
  );
};
