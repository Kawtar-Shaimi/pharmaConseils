import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isAdminRoute = pathname.startsWith('/admin');
    const isLoggedIn = !!req.auth;

    if (isAdminRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/admin/:path*'],
};
