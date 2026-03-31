const axios = require("axios");

// 👉 tạo instance axios
const directus = axios.create({
  baseURL: process.env.DIRECTUS_URL,
  headers: {
    Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 5000,
});


// ==========================
// 🔥 HANDLE RESPONSE CHUNG
// ==========================
directus.interceptors.response.use(
  (response) => {
    return response.data; // chỉ trả data cho gọn
  },
  (error) => {
    console.error("DIRECTUS ERROR:", error.response?.data || error.message);

    throw new Error("directus_error");
  }
);


// ==========================
// 🚀 HELPER FUNCTIONS
// ==========================

// 👉 GET
async function get(url, params = {}) {
  return await directus.get(url, { params });
}

// 👉 POST
async function post(url, data = {}) {
  return await directus.post(url, data);
}

// 👉 PATCH
async function patch(url, data = {}) {
  return await directus.patch(url, data);
}


// ==========================
module.exports = {
  get,
  post,
  patch,
};