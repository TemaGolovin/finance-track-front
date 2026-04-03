export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRIVACY: '/privacy',
  MAIN: '/main',
  PROFILE: '/profile',

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
