import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeDatabase, createUser } from '../src/lib/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, email, firstName, lastName } = req.body as {
    userId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    await initializeDatabase();
    const user = await createUser(userId, email, firstName, lastName);
    return res.status(200).json({ user });
  } catch (error: any) {
    console.error('setup-user error', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 