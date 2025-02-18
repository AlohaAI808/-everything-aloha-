interface ConvertKitResponse {
  subscription: {
    id: number;
    state: string;
    created_at: string;
    subscriber: {
      id: number;
    };
  };
}

export async function convertKitSubscribe(email: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.convertkit.com/v3/forms/8085cb5598/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: import.meta.env.CONVERTKIT_API_KEY,
        email: email
      })
    });

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    const data: ConvertKitResponse = await response.json();
    return data.subscription.state === 'active';
  } catch (error) {
    console.error('ConvertKit subscription error:', error);
    return false;
  }
}