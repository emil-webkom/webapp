import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: ", req.nextUrl.pathname);
  console.log("IS LOGGED IN: ", isLoggedIn);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
