import { auth } from "@/app/_lib/auth";
export const middleware = auth;

// 只在 "/account" 頁面觸發 middleware
export const config = {
  matcher: ["/account"],
};

// 自定義中間件
// import { NextResponse } from "next/server";
// export function middleware(request) {
//   console.log(request);
//   return NextResponse.redirect(new URL("/about", request.url));
// }
