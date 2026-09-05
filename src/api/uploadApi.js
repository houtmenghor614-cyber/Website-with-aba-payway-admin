import api from "./axios";

// Folders accepted by POST /uploads/image
export const FOLDERS = [
  "product_main",
  "product_sub",
  "category",
  "banner",
  "user",
  "review",
  "settings",
];

/** Upload a generic image (returns { path, folder }). */
export async function uploadImage(folder, file) {
  const form = new FormData();
  form.append("folder", folder);
  form.append("file", file);
  const { data } = await api.post("/uploads/image", form);
  return data;
}

