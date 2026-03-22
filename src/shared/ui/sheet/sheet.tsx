import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  Sheet as SheetShadcn,
  SheetTitle,
  SheetTrigger,
} from '@/shared/lib/shadcn/sheet';

interface SheetProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  description?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Sheet: React.FC<SheetProps> = ({
  trigger,
  children,
  footer,
  title,
  description,
  isOpen,
  onOpenChange,
}) => {
  return (
    <SheetShadcn open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
          {children}
        </SheetHeader>
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </SheetShadcn>
  );
};
