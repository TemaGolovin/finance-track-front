import {
  Drawer as DrawerShadcn,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/lib/shadcn/drawer';
import { Button } from '../button/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface DrawerProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  renderContent: (onClose: () => void) => React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ trigger, title, description, renderContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const commonT = useTranslations('common');

  return (
    <DrawerShadcn open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="mt-0 max-h-dvh">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
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
