import { UserProgress } from '../types';

// Utility for making authenticated requests
async function request(path: string, options: RequestInit & { userId: string }): Promise<any> {
  const { userId, ...fetchOptions } = options;
  const res = await fetch(`${path}?userId=${encodeURIComponent(userId)}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers || {})
    }
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export async function fetchProgress(userId: string): Promise<UserProgress | null> {
  const data = await request('/api/progress', { method: 'GET', userId });
  return data.progress as UserProgress;
}

export async function saveProgress(userId: string, progress: UserProgress) {
  await request('/api/progress', {
    method: 'POST',
    body: JSON.stringify({ userId, progress }),
    userId
  });
} 