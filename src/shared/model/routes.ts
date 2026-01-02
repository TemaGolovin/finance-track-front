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
  CATEGORY_DETAIL: '/category/:id',
  CATEGORY_EDIT: '/category/:id/edit',
} as const;

export type RoutesType = (typeof ROUTES)[keyof typeof ROUTES];
