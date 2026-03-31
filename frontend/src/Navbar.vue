<script setup>
import { ref } from "vue";
import { useUserStore } from "./core/userStore";
import { useRouter } from "vue-router";

const isOpen = ref(false);
const userStore = useUserStore();
const router = useRouter();

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<template>
  <!-- Top bar -->
  <div
    class="bg-gray-900 text-white flex justify-between items-center px-4 py-3"
  >
    <button @click="toggle">☰</button>
    <div class="font-bold">TradingWeb</div>
  </div>

  <!-- Overlay -->
  <div
    v-if="isOpen"
    @click="toggle"
    class="fixed inset-0 bg-black/50 z-40"
  ></div>

  <!-- Sidebar -->
  <div
    class="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-4 border-b border-gray-700">
      <div class="font-bold text-lg">Menu</div>
    </div>

    <!-- Menu -->
    <div class="p-4 flex flex-col gap-4">
      <button
        @click="
          router.push('/');
          toggle();
        "
      >
        Home
      </button>

      <button
        @click="
          router.push('/sessions');
          toggle();
        "
      >
        Sessions
      </button>

      <button
        @click="
          router.push('/user');
          toggle();
        "
      >
        User
      </button>

      <button
        @click="
          router.push('/transaction');
          toggle();
        "
      >
        Transaction
      </button>
      
      <button
        @click="
          router.push('/group');
          toggle();
        "
      >
        Group
      </button>


      <!-- Sau này -->
      <!-- <button>💰 Wallet</button> -->
      <!-- <button>📦 Trading</button> -->

      <div class="mt-6 border-t border-gray-700 pt-4">
        <div v-if="userStore.user" class="text-sm text-gray-300 mb-2">
          {{ userStore.user.email }}
        </div>

        <button @click="logout" class="bg-red-500 w-full py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
