// Type definitions for forms
export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  interests?: string[];
}

export interface VacationPlannerForm {
  name: string;
  email: string;
  phone?: string;
  travel_dates: string;
  travelers: number;
  islands: string[];
  travel_style: string;
  planning_option: string;
  interests?: string;
  notes?: string;
}