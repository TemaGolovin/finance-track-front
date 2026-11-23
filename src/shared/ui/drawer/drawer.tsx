'use client';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  Drawer as DrawerShadcn,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/lib/shadcn/drawer';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '../button/button';

interface DrawerProps {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  renderContent: (onClose: () => void) => React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  trigger,
  title,
  description,
  renderContent,
  open,
  onOpenChange,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setIsOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const commonT = useTranslations('common');

  return (
    <DrawerShadcn open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? <DrawerTrigger asChild>{trigger}</DrawerTrigger> : null}
      <DrawerContent className="mt-0 max-h-dvh">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description ? <DrawerDescription>{description}</DrawerDescription> : null}
        </DrawerHeader>
        <div className="px-4">{renderContent(() => setIsOpen(false))}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{commonT('cancel')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerShadcn>
  );
};
