/**
 * Backend endpoints.
 *
 * `REACT_APP_API_URL` / `REACT_APP_ASSET_URL` still win, but empty or stale
 * values that point at a decommissioned host (the old `...-o1vt` Render
 * service) are ignored and the live backend is used instead.  That way a
 * leftover env var in the Vercel dashboard can never make the dashboard call a
 * dead API again.
 */
const LIVE_API_URL = "https://website-with-aba-payway-1.onrender.com/api/v1";
const LIVE_ASSET_URL = "https://website-with-aba-payway-1.onrender.com/uploads";

// Gone for good -- matched as a case-insensitive substring.
const DEAD_HOSTS = ["o1vt", "website-with-aba-payway.onrender.com"];

function resolveEnvUrl(raw, fallback) {
  const value = String(raw || "").trim().replace(/\/+$/, "");
  if (!value) return fallback;
  const lower = value.toLowerCase();
  if (DEAD_HOSTS.some((host) => lower.includes(host))) return fallback;
  return value;
}

export const API_URL = resolveEnvUrl(process.env.REACT_APP_API_URL, LIVE_API_URL);

export const ASSET_URL = resolveEnvUrl(
  process.env.REACT_APP_ASSET_URL,
  LIVE_ASSET_URL
);

export const PUBLIC_URL = process.env.PUBLIC_URL || "";

export const ADMIN_ROLE = "admin";

export const FALLBACK_IMAGE = `${PUBLIC_URL}/assets/images/placeholder.png`;
export const LOGO_URL = `${PUBLIC_URL}/assets/logo/logo.png`;

/** Build a full URL for a stored path such as "products/main/abc.png". */
export function assetUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${ASSET_URL}/${path.replace(/^\/+/, "")}`;
}

export function imageOrDefault(path, fallback = FALLBACK_IMAGE) {
  return assetUrl(path) || fallback;
}

export function initials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
