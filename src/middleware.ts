

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware (request:NextRequest){
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/registration';

    const token = request.cookies.get('authtoken')?.value ;
    
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    
}



export const config ={
    matcher:[
        '/',
        '/login',
        '/registration',
        '/dashboard/:path*',
    ]
}