import { ROUTES } from '@/shared/model/routes';
import {
  ArrowLeftRightIcon,
  Info,
  LayoutDashboard,
  MailOpen,
  MessageSquare,
  Shapes,
  Users,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type SidebarItem = {
  id: string;
  title: string;
  link: string;
  icon: ReactNode;
};

export type SidebarGroup = {
  id: string;
  items: SidebarItem[];
};

export const getSidebarGroups = (sidebarT: (key: string) => string): SidebarGroup[] => [
  {
    id: 'workspace',
    items: [
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
      {
        id: 'groups',
        title: sidebarT('groups'),
        link: ROUTES.GROUP,
        icon: <Users className="w-5" />,
      },
      {
        id: 'invitations',
        title: sidebarT('invitations'),
        link: ROUTES.INVITATION,
        icon: <MailOpen className="w-5" />,
      },
    ],
  },
  {
    id: 'service',
    items: [
      {
        id: 'feedback',
        title: sidebarT('feedback'),
        link: ROUTES.FEEDBACK,
        icon: <MessageSquare className="w-5" />,
      },
      {
        id: 'about',
        title: sidebarT('about'),
        link: ROUTES.ABOUT,
        icon: <Info className="w-5" />,
      },
    ],
  },
];
