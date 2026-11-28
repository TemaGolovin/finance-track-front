import { instanceFetch } from '@/shared/api/instances';
import { useMutation } from '@tanstack/react-query';
import type { SubmitFeedbackReq, SubmitFeedbackRes } from './types';

export const useFeedbackSubmit = () => {
  return useMutation({
    mutationFn: (data: SubmitFeedbackReq) =>
      instanceFetch<SubmitFeedbackRes>('/feedback', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
};
