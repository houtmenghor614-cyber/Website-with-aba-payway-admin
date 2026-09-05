const PREFIX = "admin_";

export function getStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

export function setStorage(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (err) {
    /* ignore quota */
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch (err) {
    /* ignore */
  }
}

export function clearAuthStorage() {
  removeStorage("token");
  removeStorage("admin");
}
