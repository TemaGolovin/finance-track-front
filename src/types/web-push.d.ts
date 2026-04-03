declare module 'web-push' {
  const webpush: {
    setVapidDetails(subject: string, publicKey: string, privateKey: string): void;
    sendNotification(subscription: PushSubscription, payload: string): Promise<void>;
  };
  export default webpush;
}
