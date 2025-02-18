export interface TravelSearchParams {
  type: 'flights' | 'hotels' | 'cars';
  origin?: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  passengers?: number;
  rooms?: number;
  cabin?: 'economy' | 'premium' | 'business' | 'first';
}

export interface SearchProvider {
  name: string;
  generateUrl: (params: TravelSearchParams) => string;
}