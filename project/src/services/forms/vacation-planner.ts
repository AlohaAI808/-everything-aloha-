// Centralizing vacation planner form handling
import type { VacationPlannerForm } from '../../types/forms';

export async function submitVacationPlannerForm(data: VacationPlannerForm): Promise<boolean> {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, value.join(', '));
      } else {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString()
    });

    return response.ok;
  } catch (error) {
    console.error('Vacation planner form error:', error);
    return false;
  }
}