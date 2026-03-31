<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-xl w-80 space-y-4">
      <h1 class="text-white text-2xl font-bold text-center">Register</h1>

      <!-- Email -->
      <input
        v-model="email"
        placeholder="Email"
        class="w-full p-2 rounded bg-gray-700 text-white"
      />

      <!-- Password -->
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-2 rounded bg-gray-700 text-white"
      />

      <!-- Confirm Password -->
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        class="w-full p-2 rounded bg-gray-700 text-white"
      />

      <!-- Error -->
      <p v-if="error" class="text-red-400 text-sm text-center">
        {{ error }}
      </p>

      <!-- Button -->
      <button
        @click="handleRegister"
        class="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
      >
        Register
      </button>

      <!-- Redirect -->
      <p class="text-gray-400 text-sm text-center">
        Already have an account?
        <span
          class="text-blue-400 cursor-pointer"
          @click="goLogin"
        >
          Login
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/core/api";
import { useRouter } from "vue-router";
import { clearToken } from "@/core/token";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const router = useRouter();

const handleRegister = async () => {
  error.value = "";

  // ✅ Validate confirm password
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  try {
    clearToken(); // tránh token cũ gây lỗi

    await api.post(
      "/users",
      {
        email: email.value,
        password: password.value,
      }
    );

    alert("Register successful");
    router.push("/login");

  } catch (err) {
    console.error(err);

    if (err.response?.data?.errors) {
      error.value = err.response.data.errors[0].message;
    } else {
      error.value = "Register failed";
    }
  }
};

const goLogin = () => {
  router.push("/login");
};
</script>