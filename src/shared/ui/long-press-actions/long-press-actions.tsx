'use client';

import { useLongPress } from '@/shared/lib/long-press/use-long-press';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from '../button/button';
import { Drawer } from '../drawer/drawer';

export interface LongPressAction {
  id: string;
  label: string;
  onSelect?: () => unknown;
  icon?: ReactNode;
  destructive?: boolean;
  /** Visual mute only — action stays pressable (e.g. to explain why it's blocked). */
  disabled?: boolean;
  confirm?: {
    title: string;
    description?: string;
    confirmLabel: string;
  };
  sheet?: {
    title: string;
    description?: string;
    render: (onClose: () => void) => ReactNode;
  };
}

interface LongPressActionsProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions: LongPressAction[];
  className?: string;
}

interface MenuToken {
  close: () => void;
}

let closeActiveMenu: MenuToken | null = null;

export const LongPressActions: FC<LongPressActionsProps> = ({
  children,
  title,
  description,
  actions,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<LongPressAction | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tokenRef = useRef<MenuToken>({ close: () => {} });

  const close = () => {
    setOpen(false);
    setActiveAction(null);
    if (closeActiveMenu === tokenRef.current) closeActiveMenu = null;
  };

  tokenRef.current.close = close;

  useEffect(() => {
    const token = tokenRef.current;
    return () => {
      if (closeActiveMenu === token) closeActiveMenu = null;
    };
  }, []);

  const { bind } = useLongPress({
    disabled: actions.length === 0,
    onLongPress: () => {
      closeActiveMenu?.close();
      closeActiveMenu = tokenRef.current;
      setActiveAction(null);
      setOpen(true);
    },
  });

  if (actions.length === 0) {
    return <div className={className}>{children}</div>;
  }

  const sheetTitle = activeAction?.confirm?.title ?? activeAction?.sheet?.title ?? title;
  const sheetDescription = activeAction
    ? (activeAction.confirm?.description ?? activeAction.sheet?.description)
    : description;

  return (
    <>
      <div className={cn('select-none [-webkit-touch-callout:none]', className)} {...bind}>
        {children}
      </div>
      <Drawer
        open={open}
        onOpenChange={(next) => {
          if (next) {
            setOpen(true);
            return;
          }
          close();
        }}
        title={sheetTitle}
        description={sheetDescription}
        renderContent={(onClose) => {
          if (activeAction?.confirm) {
            return (
              <Button
                variant="destructive"
                className="w-full"
                disabled={isSubmitting}
                onClick={async () => {
                  if (!activeAction.onSelect) return;
                  setIsSubmitting(true);
                  try {
                    await activeAction.onSelect();
                    onClose();
                  } catch {
                    // ошибка уже показана тостом в обработчике действия
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                {activeAction.confirm.confirmLabel}
              </Button>
            );
          }

          if (activeAction?.sheet) {
            return activeAction.sheet.render(onClose);
          }

          return (
            <div className="flex flex-col gap-2">
              {actions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.destructive ? 'destructive' : 'outline'}
                  className={cn('w-full', action.disabled && 'opacity-60')}
                  onClick={() => {
                    if (action.confirm || action.sheet) {
                      setActiveAction(action);
                      return;
                    }
                    onClose();
                    void action.onSelect?.();
                  }}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          );
        }}
      />
    </>
  );
};
