import { fetchWithAuth } from './client';

export async function searchVideos(query: string) {
  return fetchWithAuth('/api/search', {
    method: 'POST',
    body: JSON.stringify({ query })
  });
}

export async function getVideoSummary(videoId: string) {
  return fetchWithAuth(`/api/videos/${videoId}/summary`);
}