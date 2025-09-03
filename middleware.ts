import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isApiRoute = pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/');

  // Protection des routes API avec clé API
  if (isApiRoute) {
    const apiKey = request.headers.get('authorization');

    if (apiKey !== process.env.API_ROUTE_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: 'API key invalide ou manquante'
        },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // Protection des routes dashboard avec authentification
  if (isDashboardRoute) {
    try {
      // Faire une requête à votre API pour vérifier la session
      const baseUrl = request.nextUrl.origin;
      const sessionCheck = await fetch(`${baseUrl}/api/auth/session`, {
        method: 'GET',
        headers: {
          'Cookie': request.headers.get('cookie') || '',
          'Content-Type': 'application/json',
        },
      });

      if (!sessionCheck.ok) {
         console.log( " session expire  ")
        return NextResponse.redirect(
          new URL('/', request.url)
          
        );
      }

    } catch (error) {
      console.error('Erreur authentification middleware:', error);
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
