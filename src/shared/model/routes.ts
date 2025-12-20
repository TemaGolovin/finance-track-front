export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MAIN: '/main',
} as const;

export type RoutesType = (typeof ROUTES)[keyof typeof ROUTES];
