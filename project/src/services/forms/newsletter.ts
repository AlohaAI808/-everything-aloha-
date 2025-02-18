// Centralizing newsletter form handling
import type { NewsletterSubscription } from '../../types/forms';

export async function subscribeToNewsletter(data: NewsletterSubscription): Promise<boolean> {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString()
    });

    return response.ok;
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return false;
  }
}