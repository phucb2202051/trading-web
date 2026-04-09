<script setup>
import { ref, onMounted } from "vue";
import api from "@/core/api";

// ================= STATE =================
const wallet = ref(null);
const transactions = ref([]);

const loading = ref(false);
const submitting = ref(false);

const amount = ref("");

// ================= FETCH WALLET =================
const fetchWallet = async () => {
  try {
    const res = await api.get("/items/wallet");
    wallet.value = res.data.data?.[0] || null;
  } catch (err) {
    console.error(err);
  }
};

// ================= FETCH TRANSACTIONS =================
const fetchTransactions = async () => {
  try {
    loading.value = true;

    const res = await api.get("/items/wallet_transaction", {
      params: {
        sort: "-date_created",
      },
    });

    transactions.value = res.data.data || [];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// ================= SUBMIT =================
const submitWithdraw = async () => {
  if (!wallet.value) return;

  const money = Number(amount.value);

  if (!money || money <= 0) {
    alert("Số tiền không hợp lệ");
    return;
  }

  if (money > wallet.value.w_balance) {
    alert("Số dư không đủ");
    return;
  }

  if (!wallet.value.w_bank || !wallet.value.w_credit) {
    alert("Chưa có thông tin ngân hàng");
    return;
  }

  try {
    submitting.value = true;

    await api.post("/items/wallet_transaction", {
      w_id: wallet.value.w_id,
      wt_amount: money,
    });

    alert("Đã gửi yêu cầu rút tiền!");
    amount.value = "";

    // reload data
    await fetchWallet();
    await fetchTransactions();
  } catch (err) {
    console.error(err);
  } finally {
    submitting.value = false;
  }
};

// ================= FORMAT =================
const formatMoney = (val) => {
  return Number(val).toLocaleString() + " đ";
};

const formatDate = (date) => {
  return new Date(date).toLocaleString("vi-VN");
};

// ================= STATUS COLOR =================
const statusClass = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-400";
    case "approved":
      return "text-green-400";
    case "rejected":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

// ================= TYPE COLOR =================
const typeClass = (type) => {
  switch (type) {
    case "withdraw":
      return "text-red-400";
    case "deposit":
      return "text-green-400";
    default:
      return "text-blue-400";
  }
};

// ================= INIT =================
onMounted(async () => {
  await fetchWallet();
  await fetchTransactions();
});
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <div class="max-w-2xl mx-auto space-y-6">

      <!-- WITHDRAW -->
      <div class="bg-gray-800 p-6 rounded-xl space-y-4">
        <h2 class="text-xl font-bold">💸 Rút tiền</h2>

        <div v-if="wallet">
          <p>
            Wallet Id: 
            <span class="text-green-400 font-bold">
              {{ wallet.w_id }}
            </span>
          </p>
          <p>
            💰 Số dư:
            <span class="text-green-400 font-bold">
              {{ formatMoney(wallet.w_balance) }}
            </span>
          </p>

          <p>🏦 {{ wallet.w_bank || "Chưa có" }}</p>
          <p>💳 {{ wallet.w_credit || "Chưa có" }}</p>
        </div>

        <input
          v-model="amount"
          type="number"
          placeholder="Nhập số tiền muốn rút"
          class="w-full p-3 bg-gray-700 rounded"
        />

        <button
          @click="submitWithdraw"
          :disabled="submitting"
          class="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-bold"
        >
          {{ submitting ? "Đang gửi..." : "Rút tiền" }}
        </button>
      </div>

      <!-- HISTORY -->
      <div class="bg-gray-800 p-6 rounded-xl">
        <h2 class="text-xl font-bold mb-4">📜 Lịch sử giao dịch</h2>

        <div v-if="loading">Đang tải...</div>

        <div v-else-if="transactions.length === 0">
          Chưa có giao dịch
        </div>

        <div v-else class="space-y-3">

          <div
            v-for="tx in transactions"
            :key="tx.date_created"
            class="bg-gray-700 p-4 rounded-lg"
          >
            <div class="flex justify-between">
              <span :class="typeClass(tx.wt_type)">
                Loại: {{ tx.wt_type }}
              </span>

              <span :class="statusClass(tx.status)">
                Trạng thái: {{ tx.status }}
              </span>
            </div>

            <p class="font-bold">
              Số tiền: {{ formatMoney(tx.wt_amount) }}
            </p>

            <p class="text-gray-400 text-sm">
              Nội dung: {{ tx.wt_content }}
            </p>

            <p class="text-gray-500 text-xs">
              Ngày tạo: {{ formatDate(tx.date_created) }}
            </p>

            <p class="text-gray-500 text-xs">
              Ngày cập nhật: {{ formatDate(tx.date_updated) }}
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>