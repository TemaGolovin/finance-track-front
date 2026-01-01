import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  Sheet as SheetShadcn,
  SheetTitle,
  SheetTrigger,
} from '@/shared/lib/shadcn/sheet';

interface SheetProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Sheet: React.FC<SheetProps> = ({
  trigger,
  children,
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
      </SheetContent>
    </SheetShadcn>
  );
};
