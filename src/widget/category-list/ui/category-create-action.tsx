import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const CategoryCreateAction = () => {
  const commonT = useTranslations('common');

  return (
    <Link href={ROUTES.CATEGORY_CREATE}>
      <Button size={'lg'} variant={'primary'}>
        <Plus className="w-5 h-5" />
        <div className="text-xs">{commonT('create')}</div>
      </Button>
    </Link>
  );
};
