import { ROUTES } from '@/shared/model/routes';
import { FixedPlusLinkButton } from '@/shared/ui';

export const CategoryCreateAction = () => {
  return <FixedPlusLinkButton link={ROUTES.CATEGORY_CREATE} />;
};
