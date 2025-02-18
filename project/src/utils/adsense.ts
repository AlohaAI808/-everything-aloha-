---
export const initializeAdsense = () => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {
    console.error('Error initializing AdSense:', error);
  }
};

export const validateAdSlot = (slotId: string): boolean => {
  return typeof slotId === 'string' && slotId.length > 0;
};
---