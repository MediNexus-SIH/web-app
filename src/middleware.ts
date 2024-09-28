import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   console.log("Middleware - Current path:", request.nextUrl.pathname);
//   console.log("Middleware - Token exists:", !!token);

//   // Allow access to API routes
//   if (request.nextUrl.pathname.startsWith("/api")) {
//     return NextResponse.next();
//   }

//   // Redirect unauthenticated users to signin page
//   if (!token && !request.nextUrl.pathname.startsWith("/auth")) {
//     console.log("Middleware - Redirecting to signin");
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   }

//   // Redirect authenticated users away from auth pages
//   if (token && request.nextUrl.pathname.startsWith("/auth")) {
//     console.log("Middleware - Redirecting to dashboard");
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Allow access to dashboard for authenticated users
//   if (token && request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/:path*", "/api/:path*"],
};
