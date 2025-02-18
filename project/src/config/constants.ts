// Site configuration
export const SITE_CONFIG = {
  title: 'Everything Aloha',
  description: 'Your ultimate guide to exploring the Hawaiian Islands',
  baseUrl: 'https://gateway-to-aloha.netlify.app'
};

// Image configuration
export const imageConfig = {
  formats: ['webp', 'avif', 'jpg'] as const,
  defaultQuality: 80,
  breakpoints: [640, 768, 1024, 1280, 1536],
  placeholderSize: 16,
  domains: [
    'images.unsplash.com',
    'res.cloudinary.com'
  ]
};

// Form configuration
export const FORM_CONFIG = {
  newsletter: {
    formName: 'newsletter',
    successMessage: 'Thanks for subscribing!',
    errorMessage: 'Subscription failed. Please try again.'
  },
  vacationPlanner: {
    formName: 'vacation-planner',
    successMessage: 'Thanks for your request! We\'ll be in touch soon.',
    errorMessage: 'Submission failed. Please try again.'
  }
};

// Weather configuration
export const WEATHER_CONFIG = {
  cacheDuration: 30 * 60 * 1000, // 30 minutes
  locations: {
    honolulu: { lat: 21.3069, lon: -157.8583 },
    lahaina: { lat: 20.8783, lon: -156.6825 },
    lihue: { lat: 21.9811, lon: -159.3711 },
    kona: { lat: 19.6398, lon: -155.9969 }
  }
};