import api from "./axios";
import { getBotInfo } from "./telegramApi";
import { getMe, updateMe, changePassword } from "./userApi";

/** Read the persisted store settings (logo/delivery). */
export async function getStoreAdminSettings() {
  const { data } = await api.get("/settings");
  return data;
}

/** Save store settings. Allowed keys: store_name, logo_path, delivery_fee,
 * delivery_free_threshold, delivery_image_path, delivery_note. */
export async function saveStoreSettings(payload) {
  const { data } = await api.put("/settings", payload);
  return data;
}

export { getMe, updateMe, changePassword, getBotInfo };

