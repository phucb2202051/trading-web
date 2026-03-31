<script setup>
import Navbar from "./Navbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
  <div class="bg-gray-950 min-h-screen text-white">
    <Navbar v-if="!['/login', '/register'].includes(route.path)" />

    <div class="p-4">
      <router-view />
    </div>
  </div>
</template>
