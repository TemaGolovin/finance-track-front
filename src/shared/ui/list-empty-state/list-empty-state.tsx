'use client';

import { LinkButton } from '../link/link';

interface ListEmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export const ListEmptyState: React.FC<ListEmptyStateProps> = ({
  message,
  actionLabel,
  actionHref,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 py-8 px-4 text-center">
      <p className="text-sm text-foreground/60">{message}</p>
      {actionLabel && actionHref ? (
        <LinkButton
          href={actionHref}
          buttonProps={{ variant: 'primary', size: 'lg', className: 'no-underline' }}
        >
          {actionLabel}
        </LinkButton>
      ) : null}
    </div>
  );
};
