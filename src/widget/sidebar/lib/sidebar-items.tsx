import { ROUTES } from '@/shared/model/routes';
import { ArrowLeftRightIcon, LayoutDashboard, Shapes } from 'lucide-react';

export const getSidebarItems = (sidebarT: (key: string) => string) => [
  {
    id: 'main',
    title: sidebarT('main'),
    link: ROUTES.MAIN,
    icon: <LayoutDashboard className="w-5" />,
  },
  {
    id: 'operations',
    title: sidebarT('operations'),
    link: ROUTES.OPERATION,
    icon: <ArrowLeftRightIcon className="w-5" />,
  },
  {
    id: 'categories',
    title: sidebarT('categories'),
    link: ROUTES.CATEGORY,
    icon: <Shapes className="w-5" />,
  },
];
