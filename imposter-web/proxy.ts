import { NextRequest, NextResponse } from "next/server";
import { isLogin } from "./utils/auth";

export async function proxy(request:NextRequest) {
    const {pathname, origin} = request.nextUrl
    if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
        if (await isLogin()) {
            return NextResponse.redirect(new URL("/home", origin))
        } else {
            return NextResponse.next()
        }
    }
    if(!(await isLogin())) {
        return NextResponse.redirect(new URL("/sign-in", origin))
    }
    if (pathname.startsWith("/admin")) {}

    return NextResponse.next()    
}

export const config = {
    matcher: [
        "/sign-in",
        "/sign-up",
        "/home",
        "/lobbies/:path*",
        "/games/:path*",
    ]
}