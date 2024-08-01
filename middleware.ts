import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;

    // Redirect to /home if user is authenticated and trying to access the root path
    if (req.nextauth.token && pathname === '/') {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    // Redirect to /auth/signin if user is not authenticated and trying to access a protected path
    if (!req.nextauth.token && pathname !== '/auth/signup' && pathname !== '/auth/signin') {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ['/', '/home', '/auth/signup', '/auth/signin'] };
