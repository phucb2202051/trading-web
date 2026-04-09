<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/core/api";
import { getToken } from "@/core/token";

const sessions = ref([]);
const bots = ref([]);
const loading = ref(false);

// popup state
const selectedSession = ref(null);
const showInput = ref(false);
const inputReceiver = ref("");

// 🔥 decode token
const getUserIdFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    return decoded.id;
  } catch (err) {
    console.error("Decode token error:", err);
    return null;
  }
};

const userId = getUserIdFromToken();

// 👉 fetch session
const fetchSessions = async () => {
  const res = await api.get("/items/trade_session");
  sessions.value = res.data.data;
};

// 👉 fetch bot
const fetchBots = async () => {
  const res = await api.get("/items/nick");
  bots.value = res.data.data;
};

// 👉 fetch wallet của user
const fetchMyWallet = async () => {
  const res = await api.get('/items/wallet');
  return res.data.data[0];
};

// 🔥 map bot theo id
const botMap = computed(() => {
  const map = {};
  bots.value.forEach(b => {
    map[b.n_id] = b;
  });
  return map;
});

// 🟢 session mình mời
const mySessions = computed(() =>
  sessions.value.filter(s => s.u_seller_id === userId)
);

// 🔵 session được mời
const invitedSessions = computed(() =>
  sessions.value.filter(s => s.u_buyer_id === userId)
);

// 💰 format giá
const formatPrice = (price) =>
  Number(price).toLocaleString("vi-VN") + "đ";

// 🔥 click Accept
const handleAccept = async (session) => {
  try {
    const wallet = await fetchMyWallet();

    if (!wallet) {
      alert("Không tìm thấy ví");
      return;
    }

    if (Number(wallet.w_balance) < Number(session.ts_price)) {
      alert("Số dư không đủ");
      return;
    }

    // mở popup
    selectedSession.value = session;
    showInput.value = true;

  } catch (err) {
    console.error(err);
    alert("Lỗi kiểm tra ví");
  }
};

// 🔥 confirm Accept
const confirmAccept = async () => {
  try {
    if (!inputReceiver.value) {
      alert("Nhập tên người nhận");
      return;
    }

    const session = selectedSession.value;

   await api.patch(`/items/trade_session/${session.ts_id}`, {
      ts_receiver: inputReceiver.value
   });

    alert("Chấp nhận thành công");

    // reset
    showInput.value = false;
    inputReceiver.value = "";
    selectedSession.value = null;

    // reload
    await fetchSessions();

  } catch (err) {
    console.error(err);
    alert("Lỗi khi chấp nhận");
  }
};

// 🚀 load data
onMounted(async () => {
  try {
    loading.value = true;
    await Promise.all([fetchSessions(), fetchBots()]);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6 text-white">
    <h1 class="text-2xl font-bold mb-6">Trade Sessions</h1>

    <!-- loading -->
    <div v-if="loading">Đang tải...</div>

    <div v-else class="space-y-8">

      <!-- 🟢 SESSION CỦA BẠN -->
      <div>
        <h2 class="text-green-400 text-xl font-semibold mb-3">
          Session của bạn
        </h2>

        <div v-if="mySessions.length === 0" class="text-gray-400">
          Không có session nào
        </div>

        <div
          v-for="s in mySessions"
          :key="s.ts_id"
          class="bg-gray-800 p-4 rounded-lg"
        >
          <!-- BOT -->
          <div class="text-yellow-400 font-semibold mb-1">
            🤖 {{ botMap[s.n_id]?.n_char_name }}
          </div>

          <div>🌐 Server: {{ botMap[s.n_id]?.n_server }}</div>
          <div>📍 Khu: {{ botMap[s.n_id]?.zone }}</div>
          <div>📊 Status: {{ botMap[s.n_id]?.status }}</div>

          <hr class="my-2 border-gray-600" />

          <div>💰 Giá: {{ formatPrice(s.ts_price) }}</div>
          <div>📦 Số lượng: {{ s.ts_num_of_item }}</div>
          <div>📊 Trạng thái: {{ s.status }}</div>
          <div>🎮 Nick gửi: {{ s.ts_sender }}</div>
          <div>🎮 Nick nhận: {{ s.ts_receiver }}</div>
        </div>
      </div>

      <!-- 🔵 SESSION ĐƯỢC MỜI -->
      <div>
        <h2 class="text-blue-400 text-xl font-semibold mb-3">
          Session được mời
        </h2>

        <div v-if="invitedSessions.length === 0" class="text-gray-400">
          Không có lời mời nào
        </div>

        <div
          v-for="s in invitedSessions"
          :key="s.ts_id"
          class="bg-gray-800 p-4 rounded-lg"
        >
          <!-- BOT -->
          <div class="text-yellow-400 font-semibold mb-1">
            🤖 {{ botMap[s.n_id]?.n_char_name }}
          </div>

          <div>🌐 Server: {{ botMap[s.n_id]?.n_server }}</div>
          <div>📍 Khu: {{ botMap[s.n_id]?.zone }}</div>
          <div>📊 Status: {{ botMap[s.n_id]?.status }}</div>

          <hr class="my-2 border-gray-600" />

          <div>💰 Giá: {{ formatPrice(s.ts_price) }}</div>
          <div>📦 Số lượng: {{ s.ts_num_of_item }}</div>
          <div>📊 Trạng thái: {{ s.status }}</div>
          <div>🎮 Nick gửi: {{ s.ts_sender }}</div>
          <div>🎮 Nick nhận: {{ s.ts_receiver }}</div>

         <div class="mt-3 space-x-2" v-if="s.status === 'Traded'">
            <button
               class="bg-green-500 px-3 py-1 rounded"
               @click="handleAccept(s)"
            >
               Accept
            </button>
         </div>
        </div>
      </div>

    </div>

    <!-- 🔥 POPUP -->
    <div
      v-if="showInput"
      class="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-80 space-y-3">
        <h2 class="text-black font-bold">Nhập tên người nhận</h2>

        <input
          v-model="inputReceiver"
          placeholder="Nhập ts_receiver"
          class="w-full p-2 rounded text-black"
        />

        <div class="flex justify-end gap-2">
          <button
            class="bg-gray-500 px-3 py-1 rounded"
            @click="showInput = false"
          >
            Hủy
          </button>

          <button
            class="bg-green-500 px-3 py-1 rounded"
            @click="confirmAccept"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>

  </div>
</template>