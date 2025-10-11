import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/signin"]);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const authenticated = await convexAuth.isAuthenticated(); // ✅ use convexAuth

    if (!isPublicPage(request) && !authenticated) {
      return nextjsMiddlewareRedirect(request, "/signin");
    }

    if (isPublicPage(request) && authenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }

    // Otherwise, let the request continue (implicitly return undefined or `NextResponse.next()`)
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
