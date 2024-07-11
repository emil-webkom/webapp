/**
 * Array of public routes, who do not need authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/for_studenten",
  "/om_emil",
  "/naeringsliv",
  "/auth/new-verification",
  "/api/styret",
  "/api/komite/logo"
];

/**
 * Array of routes used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default login redirect path.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
