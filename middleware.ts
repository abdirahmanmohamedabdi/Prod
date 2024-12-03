import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/public(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { sessionClaims } = await auth();
    const role = (sessionClaims as { publicMetadata?: { role?: string } })?.publicMetadata?.role;

    if (req.url.startsWith('/api/superadmin') && role !== 'SuperAdmin') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (req.url.startsWith('/api/finance') && role !== 'Finance') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (req.url.startsWith('/api/hr') && role !== 'Hr') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // Additional checks for page access
    if (req.url.startsWith('/superadmin') && role !== 'SuperAdmin') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (req.url.startsWith('/finance') && role !== 'Finance') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (req.url.startsWith('/hr') && role !== 'Hr') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};