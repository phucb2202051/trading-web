import { defineStore } from "pinia";
import api from "./api";
import { getToken, clearToken } from "./token";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchMe() {
      try {
        const token = getToken();
        if (!token) return;

        const res = await api.get("/users/me");
        this.user = res.data.data;

      } catch (err) {
        console.error("fetchMe error:", err);
        this.user = null;
        clearToken();
      }
    },

    logout() {
      this.user = null;
      clearToken();
    },
  },
});