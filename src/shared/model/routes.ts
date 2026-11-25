export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  MAIN: '/main',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  VERIFY_EMAIL: '/verify-email',
  VERIFY_EMAIL_SENT: '/verify-email/sent',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CONFIRM_EMAIL_CHANGE: '/confirm-email-change',

  OPERATION_CREATE: '/operation/create',
  OPERATION: '/operation',
  OPERATION_DETAIL: '/operation/:id',
  OPERATION_EDIT: '/operation/:id/edit',

  CATEGORY: '/category',
  CATEGORY_CREATE: '/category/create',
  CATEGORY_EDIT: '/category/:id/edit',

  GROUP: '/group',
  GROUP_CREATE: '/group/create',
  GROUP_DETAIL: '/group/:id',
  GROUP_EDIT: '/group/:id/edit',
  GROUP_CONNECT_CATEGORIES: '/group/:id/connect-categories',

  INVITATION: '/invitation',
} as const;

export type RoutesType = (typeof ROUTES)[keyof typeof ROUTES];

const PUBLIC_ROUTES: readonly RoutesType[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.PRIVACY,
  ROUTES.TERMS,
  ROUTES.VERIFY_EMAIL,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.CONFIRM_EMAIL_CHANGE,
];

export function isPublicPath(pathname: string): boolean {
  return (
    pathname === ROUTES.HOME ||
    PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  );
}
