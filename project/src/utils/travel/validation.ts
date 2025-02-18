import type { TravelSearchParams } from './types';

export function validateTravelSearch(params: TravelSearchParams): string[] {
  const errors: string[] = [];

  if (!params.destination) {
    errors.push('Destination is required');
  }

  if (!params.departDate) {
    errors.push('Departure date is required');
  }

  if (params.type === 'flights') {
    if (!params.origin) {
      errors.push('Origin is required for flights');
    }
    if (!params.returnDate) {
      errors.push('Return date is required for flights');
    }
  }

  // Validate dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const departDate = new Date(params.departDate);
  if (departDate < today) {
    errors.push('Departure date cannot be in the past');
  }

  if (params.returnDate) {
    const returnDate = new Date(params.returnDate);
    if (returnDate < departDate) {
      errors.push('Return date must be after departure date');
    }
  }

  return errors;
}