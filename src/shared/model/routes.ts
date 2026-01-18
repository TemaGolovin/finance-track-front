export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MAIN: '/main',

  OPERATION_CREATE: '/operation/create',
  OPERATION: '/operation',
  OPERATION_DETAIL: '/operation/:id',
  OPERATION_EDIT: '/operation/:id/edit',

  CATEGORY: '/category',
  CATEGORY_CREATE: '/category/create',
  CATEGORY_EDIT: '/category/:id/edit',

  GROUP: '/group',
  GROUP_CREATE: '/group/create',
  GROUP_EDIT: '/group/:id/edit',
} as const;

export type RoutesType = (typeof ROUTES)[keyof typeof ROUTES];
