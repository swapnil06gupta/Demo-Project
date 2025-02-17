import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware triggered!");
  // Get the JWT token from cookies
  const token = req.cookies.get("token");
  console.log(token, "tokkkkk");
  const url = req.nextUrl.pathname;

  if (token && url === "/signup") {
    return NextResponse.redirect(new URL("/about", req.url));
  }

  const publicRoutes = ["/", "/login", "/signup"];

  if (!token && !publicRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ["/about", "/contact", "/signup"], // Protect the /about route
};
