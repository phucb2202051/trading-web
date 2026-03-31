<script setup>
import { ref, onMounted } from "vue";
import api from "@/core/api";
import { getToken } from "../core/token";

console.log(getToken());

const nicks = ref([]);
const selectedNick = ref(null);

const form = ref({
  price: "",
  buyerId: "",
  sender: "",
});

const loading = ref(false);

// 🔹 fetch nick
const fetchNicks = async () => {
  try {
    const res = await api.get("/items/nick");
    nicks.value = res.data.data;
  } catch (err) {
    console.error(err);
  }
};

// 🔹 chọn nick
const selectNick = (nick) => {
  selectedNick.value = nick;
};

// 🔹 submit
const submit = async () => {
  if (!selectedNick.value) return;

  if (!form.value.price || !form.value.buyerId || !form.value.sender) {
    alert("Nhập đầy đủ!");
    return;
  }

  try {
    loading.value = true;

    await api.post("/items/trade_session", {
      n_id: selectedNick.value.n_id,
      ts_price: Number(form.value.price),
      u_buyer_id: form.value.buyerId,
      ts_sender: form.value.sender,
    });

    // reset
    selectedNick.value = null;
    form.value.price = "";
    form.value.buyerId = "";
    form.value.sender = "";

    alert("Tạo session thành công!");
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchNicks);
</script>

<template>
  <div class="p-6 text-white space-y-6">
    <h1 class="text-2xl font-bold">🎮 Danh sách Nick</h1>

    <!-- 🔵 LIST -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="nick in nicks"
        :key="nick.n_id"
        class="bg-gray-800 p-4 rounded-lg space-y-2"
      >
        <!-- 🆔 -->
        <div class="font-semibold text-lg">
          {{ nick.n_char_name }}
        </div>

        <!-- 🌍 -->
        <div class="text-sm text-gray-400">
          Server: {{ nick.n_server }}
        </div>

        <!-- 🗺 -->
        <div class="text-sm text-gray-400">
          Map: {{ nick.map }} | Zone: {{ nick.zone }}
        </div>

        <!-- 📌 -->
        <div class="text-sm text-gray-400">
          Status: {{ nick.status }}
        </div>

        <button
          @click="selectNick(nick)"
          class="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
        >
          Thuê
        </button>
      </div>
    </div>

    <!-- 🟡 FORM -->
    <div v-if="selectedNick" class="bg-gray-800 p-4 rounded-lg space-y-3">
      <h2 class="text-lg font-bold">
        Thuê: {{ selectedNick.n_char_name }}
      </h2>

      <input
        v-model="form.price"
        placeholder="TIền thu"
        class="w-full p-2 rounded bg-gray-700"
      />

      <input
        v-model="form.buyerId"
        placeholder="Id tài khoản nhận đồ"
        class="w-full p-2 rounded bg-gray-700"
      />

      <input
        v-model="form.sender"
        placeholder="Tên nick gửi đồ"
        class="w-full p-2 rounded bg-gray-700"
      />

      <div class="flex gap-2">
        <button
          @click="submit"
          :disabled="loading"
          class="bg-green-600 px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Xác nhận
        </button>

        <button
          @click="selectedNick = null"
          class="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>