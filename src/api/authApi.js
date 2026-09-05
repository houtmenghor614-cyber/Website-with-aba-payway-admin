import api from "./axios";

export async function loginRequest(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data; // { access_token, refresh_token, token_type, user }
}

export async function adminLogin(payload) {
  const data = await loginRequest(payload);
  if (data.user?.role !== "admin") {
    throw Object.assign(new Error("This account is not an administrator."), {
      code: "NOT_ADMIN",
      status: 403,
    });
  }
  return data;
}
