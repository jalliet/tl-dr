import { fetchWithAuth } from './client';

export async function getUserPreferences() {
  return fetchWithAuth('/api/user/preferences');
}

export async function updateUserPreferences(preferences: any) {
  return fetchWithAuth('/api/user/preferences', {
    method: 'PUT',
    body: JSON.stringify(preferences)
  });
}