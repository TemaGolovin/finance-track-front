export const SESSION_EXPIRED_CODE = 'SESSION_EXPIRED' as const;

export type SessionExpiredErrorBody = {
  code: typeof SESSION_EXPIRED_CODE;
  message: string;
};

export function isSessionExpiredError(body: unknown): body is SessionExpiredErrorBody {
  return (
    typeof body === 'object' &&
    body !== null &&
    'code' in body &&
    body.code === SESSION_EXPIRED_CODE
  );
}
