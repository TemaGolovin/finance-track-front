export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
} as const;

export type RoutesType = (typeof routes)[keyof typeof routes];
