import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/lib/shadcn/card';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { FC } from 'react';

interface BaseCardProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  cardClasses?: string;
}

export const BaseCard: FC<BaseCardProps> = ({
  title,
  description,
  actions,
  children,
  footer,
  cardClasses,
}) => {
  return (
    <Card className={cn('flex flex-col gap-0 p-4', cardClasses)}>
      {(title || description || actions) && (
        <CardHeader className="mb-2 px-0">
          {title && <CardTitle className="font-extrabold">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {actions && <CardAction>{actions}</CardAction>}
        </CardHeader>
      )}
      <CardContent className="text-foreground/90 text-sm px-0">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
