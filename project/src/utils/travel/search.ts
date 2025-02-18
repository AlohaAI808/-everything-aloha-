import type { TravelSearchParams } from './types';
import { providers } from './providers';
import { validateTravelSearch } from './validation';

export function generateSearchUrl(params: TravelSearchParams): string {
  const errors = validateTravelSearch(params);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  switch (params.type) {
    case 'flights':
      return params.origin?.includes('HNL') || params.destination?.includes('HNL') 
        ? providers.hawaiianAir.generateUrl(params)
        : providers.googleFlights.generateUrl(params);
    case 'hotels':
      return providers.booking.generateUrl(params);
    default:
      throw new Error('Unsupported search type');
  }
}