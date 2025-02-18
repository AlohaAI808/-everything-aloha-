export interface Airport {
  code: string;
  name: string;
  city: string;
  state?: string;
  country: string;
  type: 'international' | 'domestic' | 'hawaiian';
}

export const hawaiianAirports: Airport[] = [
  { code: 'HNL', name: 'Daniel K. Inouye International Airport', city: 'Honolulu', state: 'Hawaii', country: 'USA', type: 'hawaiian' },
  { code: 'OGG', name: 'Kahului Airport', city: 'Kahului', state: 'Hawaii', country: 'USA', type: 'hawaiian' },
  { code: 'KOA', name: 'Ellison Onizuka Kona International Airport', city: 'Kailua-Kona', state: 'Hawaii', country: 'USA', type: 'hawaiian' },
  { code: 'LIH', name: 'Lihue Airport', city: 'Lihue', state: 'Hawaii', country: 'USA', type: 'hawaiian' },
  { code: 'ITO', name: 'Hilo International Airport', city: 'Hilo', state: 'Hawaii', country: 'USA', type: 'hawaiian' },
  { code: 'MKK', name: 'Molokai Airport', city: 'Hoolehua', state: 'Hawaii', country: 'USA', type: 'hawaiian' },
  { code: 'LNY', name: 'Lanai Airport', city: 'Lanai City', state: 'Hawaii', country: 'USA', type: 'hawaiian' },
  { code: 'JHM', name: 'Kapalua Airport', city: 'Lahaina', state: 'Hawaii', country: 'USA', type: 'hawaiian' }
];

export const majorUSAirports: Airport[] = [
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', state: 'California', country: 'USA', type: 'international' },
  { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', state: 'California', country: 'USA', type: 'international' },
  { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', state: 'Washington', country: 'USA', type: 'international' },
  { code: 'PDX', name: 'Portland International Airport', city: 'Portland', state: 'Oregon', country: 'USA', type: 'international' },
  { code: 'LAS', name: 'Harry Reid International Airport', city: 'Las Vegas', state: 'Nevada', country: 'USA', type: 'international' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix', state: 'Arizona', country: 'USA', type: 'international' },
  { code: 'DEN', name: 'Denver International Airport', city: 'Denver', state: 'Colorado', country: 'USA', type: 'international' },
  { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', state: 'Illinois', country: 'USA', type: 'international' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', state: 'New York', country: 'USA', type: 'international' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', state: 'Georgia', country: 'USA', type: 'international' }
];

export const allAirports = [...hawaiianAirports, ...majorUSAirports];

export function searchAirports(query: string): Airport[] {
  const searchTerm = query.toLowerCase();
  return allAirports.filter(airport => 
    airport.code.toLowerCase().includes(searchTerm) ||
    airport.city.toLowerCase().includes(searchTerm) ||
    airport.name.toLowerCase().includes(searchTerm) ||
    (airport.state && airport.state.toLowerCase().includes(searchTerm))
  );
}

export function formatAirportDisplay(airport: Airport): string {
  return `${airport.city}${airport.state ? `, ${airport.state}` : ''} (${airport.code})`;
}