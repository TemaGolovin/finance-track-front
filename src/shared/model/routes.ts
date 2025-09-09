export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

export type RoutesType = (typeof ROUTES)[keyof typeof ROUTES];
