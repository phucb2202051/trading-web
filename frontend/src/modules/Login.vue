<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-xl w-80 space-y-4">
      <h1 class="text-white text-2xl font-bold text-center">Login</h1>

      <input
        v-model="email"
        placeholder="Email"
        class="w-full p-2 rounded bg-gray-700 text-white"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-2 rounded bg-gray-700 text-white"
      />

      <button
        @click="handleLogin"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Login
      </button>
            <p class="text-gray-400 text-sm text-center">
        You don't have an account?
        <span
          class="text-blue-400 cursor-pointer"
          @click="goRegister"
        >
          Register
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/core/api";
import { setToken } from "@/core/token";
import { useRouter } from "vue-router";
import { clearToken } from "../core/token";

const email = ref("");
const password = ref("");
const router = useRouter();



const handleLogin = async () => {
  try {
    clearToken();
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    }
   );
    const token = res.data.data.access_token;
    setToken(token);
    
    router.push("/");
  } catch (err) {
    alert("Login failed");
  }
};

const goRegister = () => {
  router.push("/register");
};
</script>