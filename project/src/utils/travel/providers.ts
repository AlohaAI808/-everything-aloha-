import type { SearchProvider, TravelSearchParams } from './types';

export const providers: Record<string, SearchProvider> = {
  hawaiianAir: {
    name: 'Hawaiian Airlines',
    generateUrl: (params: TravelSearchParams) => {
      const { origin, destination, departDate, returnDate, passengers, cabin } = params;
      return `https://www.hawaiianairlines.com/book/flights?origin=${origin}&destination=${destination}&departureDate=${departDate}&returnDate=${returnDate}&adultCount=${passengers}&cabin=${cabin}`;
    }
  },
  googleFlights: {
    name: 'Google Flights',
    generateUrl: (params: TravelSearchParams) => {
      const { origin, destination, departDate, returnDate } = params;
      return `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${departDate}%20through%20${returnDate}`;
    }
  },
  booking: {
    name: 'Booking.com',
    generateUrl: (params: TravelSearchParams) => {
      const { destination, departDate, returnDate, rooms } = params;
      return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination + ', Hawaii')}&checkin=${departDate}&checkout=${returnDate}&no_rooms=${rooms}`;
    }
  }
};

export function formatDate(date: string, format: 'url' | 'display' = 'url'): string {
  const d = new Date(date);
  if (format === 'display') {
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}