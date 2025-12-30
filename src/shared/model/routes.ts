export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MAIN: '/main',
  OPERATION_CREATE: '/operation/create',
  OPERATION: '/operation',
} as const;

export type RoutesType = (typeof ROUTES)[keyof typeof ROUTES];
