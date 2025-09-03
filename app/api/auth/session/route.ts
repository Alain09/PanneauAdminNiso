import { NextRequest } from 'next/server';
import { auth } from '@/src/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession(request);
    
    if (!session) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    return Response.json({ 
      user: session.user,
      session: session.session 
    });
  } catch (error) {
    console.error('Session API Error:', error);
    return Response.json({ error: 'Failed to get session' }, { status: 500 });
  }
}