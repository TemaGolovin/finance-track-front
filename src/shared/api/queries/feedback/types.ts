export type FeedbackType = 'problem' | 'suggestion';

export interface SubmitFeedbackReq {
  type: FeedbackType;
  message: string;
  replyEmail: string;
}

export interface SubmitFeedbackRes {
  success: true;
}
