import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/lib/shadcn/card';
import { FC } from 'react';

interface BaseCardProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const BaseCard: FC<BaseCardProps> = ({ title, description, actions, children, footer }) => {
  return (
    <Card className="flex flex-col gap-0">
      <CardHeader className="mb-2">
        {title && <CardTitle className="font-extrabold">{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        {actions && <CardAction>{actions}</CardAction>}
      </CardHeader>
      <CardContent className="text-foreground/90 text-sm">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
