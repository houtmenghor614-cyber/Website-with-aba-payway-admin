export const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://website-with-aba-payway-1.onrender.com/api/v1";

export const ASSET_URL =
  process.env.REACT_APP_ASSET_URL ||
  "https://website-with-aba-payway-1.onrender.com/uploads";

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
