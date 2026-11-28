'use client';

import { useFeedbackSubmit } from '@/shared/api/queries/feedback';
import { Button, Input, Textarea, ToggleGroup } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type FeedbackFormType, createFeedbackSchema } from '../lib/validate-feedback-form';

interface FeedbackSubmitFormProps {
  initialReplyEmail: string;
}

const apiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === 'object' && 'message' in err) {
    const m = (err as { message: unknown }).message;
    if (Array.isArray(m)) return m.join(', ');
    if (typeof m === 'string') return m;
  }
  return fallback;
};

export const FeedbackSubmitForm = ({ initialReplyEmail }: FeedbackSubmitFormProps) => {
  const t = useTranslations('feedback');
  const tRoot = useTranslations();
  const schema = useMemo(() => createFeedbackSchema(tRoot), [tRoot]);
  const { mutateAsync: submitFeedback, isPending } = useFeedbackSubmit();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FeedbackFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      type: 'problem',
      replyEmail: initialReplyEmail,
      message: '',
    },
  });

  const onSubmit = async (data: FeedbackFormType) => {
    await toast.promise(
      submitFeedback({
        type: data.type,
        replyEmail: data.replyEmail.trim(),
        message: data.message.trim(),
      }).then(() => {
        reset({
          type: data.type,
          replyEmail: data.replyEmail,
          message: '',
        });
      }),
      {
        loading: t('loading'),
        success: t('success'),
        error: (err: unknown) => apiErrorMessage(err, t('error')),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-md p-3 flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">{t('hint')}</p>

      <div>
        <div className="text-left text-sm mb-1">{t('typeLabel')}</div>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              selectedId={field.value}
              onClick={field.onChange}
              items={[
                {
                  id: 'problem' as const,
                  ariaLabel: t('typeProblem'),
                  content: t('typeProblem'),
                },
                {
                  id: 'suggestion' as const,
                  ariaLabel: t('typeSuggestion'),
                  content: t('typeSuggestion'),
                },
              ]}
            />
          )}
        />
      </div>

      <div>
        <Input
          id="feedback-reply-email"
          type="email"
          label={t('replyEmailLabel')}
          error={errors.replyEmail?.message}
          {...register('replyEmail')}
        />
      </div>

      <div>
        <Textarea
          id="feedback-message"
          label={t('messageLabel')}
          error={errors.message?.message}
          rows={6}
          {...register('message')}
        />
      </div>

      <Button
        type="submit"
        variant="outline"
        className="w-full sm:w-auto"
        disabled={!isValid || isPending}
      >
        {t('submit')}
      </Button>
    </form>
  );
};
