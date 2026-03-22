'use client';
import { useAboutMe } from '@/shared/api/queries/auth';
import { InvitationStatuses } from '@/shared/api/queries/invitation/types';
import { useInvitations } from '@/shared/api/queries/user';
import { ROUTES } from '@/shared/model/routes';
import { Badge, Button } from '@/shared/ui';
import { MailOpen } from 'lucide-react';
import Link from 'next/link';

export const InvitationAction = () => {
  const { data: user } = useAboutMe();
  const { data: invitations } = useInvitations();

  if (!user) {
    return null;
  }

  const pendingCount =
    invitations?.received.filter((inv) => inv.status === InvitationStatuses.PENDING).length ?? 0;

  return (
    <Button
      size="icon"
      variant="outline"
      asChild
      className="relative bg-linear-to-t from-secondary/60 to-background/70 rounded-lg"
      title="Invitations"
      aria-label="Invitations"
    >
      <Link href={ROUTES.INVITATION}>
        <MailOpen className="w-6 h-6" />
        {pendingCount > 0 && (
          <Badge
            variant={'accent'}
            className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 text-xs leading-none border border-accent-foreground"
          >
            {pendingCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
};
