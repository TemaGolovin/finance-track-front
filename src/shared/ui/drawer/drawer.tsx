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

interface DrawerProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  description?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ trigger, children, title, description }) => {
  const commonT = useTranslations('common');

  return (
    <DrawerShadcn>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{commonT('cancel')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerShadcn>
  );
};
