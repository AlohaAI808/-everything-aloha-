export interface NewsletterSubscriber {
  email: string;
  firstName?: string;
  interests?: string[];
  subscribeDate: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
}