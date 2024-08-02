import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth} from "@/context";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const auth = await getAuth();

  if(!auth) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard/users")) {
    if (auth.role === "Admin") {
      return;
    }

    return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }
  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL(`/dashboard`, request.url));
  // }
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    
    if (!auth) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (auth) {
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }
  }
}
