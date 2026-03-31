// src/core/token.js
export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const clearToken = () => {
  localStorage.removeItem("access_token");
};

export const decodeToken = (token) => {
  try {
    if (!token) return null;

    const payload = token.split(".")[1];
    const decoded = atob(payload);

    return JSON.parse(decoded);
  } catch (err) {
    console.error("Decode token error:", err);
    return null;
  }
};

export const getUserIdFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    // 👉 Directus dùng "id"
    return decoded.id || null;

  } catch (err) {
    console.error("Get user id error:", err);
    return null;
  }
};