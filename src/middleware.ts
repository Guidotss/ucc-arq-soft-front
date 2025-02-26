import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname == "/admin" || req.nextUrl.pathname == "/my-courses") {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl).href);
    }
  }
  return NextResponse.next();
};