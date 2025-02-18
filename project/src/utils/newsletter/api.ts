import type { NewsletterSubscriber, SubscriptionResponse } from './types';
import { validateEmail, sanitizeEmail } from './validation';

export async function subscribeToNewsletter(email: string, firstName?: string): Promise<SubscriptionResponse> {
  try {
    if (!validateEmail(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }

    const subscriber: NewsletterSubscriber = {
      email: sanitizeEmail(email),
      firstName,
      subscribeDate: new Date().toISOString(),
      interests: ['general']
    };

    // Submit to Netlify Forms
    const formData = new FormData();
    Object.entries(subscriber).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ? value.join(',') : value);
    });

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString()
    });

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    return {
      success: true,
      message: 'Thank you for subscribing! Check your email for confirmation.'
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error processing your subscription. Please try again.'
    };
  }
}