import { ADMIN_ROLE } from "./constants";

/**
 * Role based permission helper. Extend with a resource map when the app
 * grows more granular permissions.
 */
export function isAdmin(user) {
  return Boolean(user && (user.role === ADMIN_ROLE || user.is_admin));
}

export function can(user, action) {
  if (!user) return false;
  if (action === "admin") return isAdmin(user);
  return true;
}

export function hasAnyRole(user, roles = []) {
  return roles.includes(user?.role);
}
