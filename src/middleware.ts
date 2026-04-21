import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Only protect the dashboard UI, let the API handles its own auth or be public for the demo
const isProtectedRoute = createRouteMatcher([
  "/workflow(.*)", 
  // Removed /api/workflow from here to prevent the HTML redirect loop
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};