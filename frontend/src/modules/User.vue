<script setup>
import { ref, onMounted } from "vue";
import api from "@/core/api";
import { getToken, decodeToken } from "@/core/token";
import { BANKS } from "@/core/banks";

console.log(getToken());

// ================= STATE =================
const userId = ref(null);

const wallet = ref(null);
const loading = ref(false);

// edit
const isEditing = ref(false);
const saving = ref(false);

const form = ref({
  w_bank: "",
  w_credit: "",
});


// ================= INIT USER =================
const initUser = () => {
  const token = getToken();
  if (!token) return;

  const decoded = decodeToken(token);
  userId.value = decoded?.id;
};

// ================= FETCH =================
const fetchWallet = async () => {
  try {
    loading.value = true;

    const res = await api.get("/items/wallet");
    wallet.value = res.data.data?.[0] || null;

    if (wallet.value) {
      form.value = {
        w_bank: wallet.value.w_bank || "",
        w_credit: wallet.value.w_credit || "",
      };
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// ================= UPDATE =================
const updateWallet = async () => {
  if (!wallet.value) return;

  try {
    saving.value = true;

    await api.patch(`/items/wallet/${wallet.value.w_id}`, {
      w_bank: form.value.w_bank,
      w_credit: form.value.w_credit,
    });

    isEditing.value = false;
    await fetchWallet();
  } catch (err) {
    console.error(err);
  } finally {
    saving.value = false;
  }
};

// ================= COPY =================
const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Đã copy!");
  } catch (err) {
    console.error(err);
  }
};

// ================= LIFECYCLE =================
onMounted(() => {
  initUser();
  fetchWallet();
});
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <div class="max-w-xl mx-auto bg-gray-800 rounded-xl p-6 space-y-6">

      <!-- USER -->
      <div>
        <h2 class="text-xl font-bold mb-3">👤 User</h2>

        <div class="flex justify-between items-center bg-gray-700 p-3 rounded">
          <span class="font-mono text-sm break-all">
            {{ userId }}
          </span>

          <button
            @click="copyText(userId)"
            class="bg-blue-600 px-3 py-1 rounded"
          >
            Copy
          </button>
        </div>
      </div>

      <!-- WALLET -->
      <div>
        <h2 class="text-xl font-bold mb-4">💰 Ví</h2>

        <div v-if="loading">Đang tải...</div>

        <div v-else-if="wallet">

          <!-- VIEW -->
          <div v-if="!isEditing" class="space-y-2">
            <p>
              💰 {{ Number(wallet.w_balance).toLocaleString() }} đ
            </p>

            <p>
              🏦 {{ wallet.w_bank || "Chưa có" }}
            </p>

            <div class="flex justify-between items-center">
              <p>
                💳 {{ wallet.w_credit || "Chưa có" }}
              </p>

              <button
                v-if="wallet.w_credit"
                @click="copyText(wallet.w_credit)"
                class="bg-blue-600 px-2 py-1 rounded text-sm"
              >
                Copy
              </button>
            </div>

            <button
              @click="isEditing = true"
              class="bg-blue-600 px-4 py-2 rounded mt-2"
            >
              Edit
            </button>
          </div>

          <!-- EDIT -->
          <div v-else class="space-y-3">

            <!-- bank -->
            <select
              v-model="form.w_bank"
              class="w-full p-2 bg-gray-700 rounded"
            >
              <option value="">Chọn ngân hàng</option>
              <option
                v-for="bank in BANKS"
                :key="bank"
                :value="bank"
              >
                {{ bank }}
              </option>
            </select>

            <!-- credit -->
            <input
              v-model="form.w_credit"
              type="text"
              class="w-full p-2 bg-gray-700 rounded"
              placeholder="Số tài khoản"
            />

            <!-- actions -->
            <div class="flex gap-2">
              <button
                @click="updateWallet"
                :disabled="saving"
                class="bg-green-600 px-4 py-2 rounded"
              >
                {{ saving ? "Saving..." : "Save" }}
              </button>

              <button
                @click="isEditing = false"
                class="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>

        <div v-else>Không có ví</div>
      </div>

      <p class="text-yellow-400">
         ⚠️ Nội dung chuyển khoản: <b>wallet + mã số ví của bạn</b>, ví dụ: <b>wallet22</b> , nếu không có hoặc sai nội dung, chúng tôi sẽ không thể cập nhật số dư cho bạn.
      </p>

      <!-- QR -->
      <div class="flex justify-center">
      <img
         src="/bank.jpg"
         alt="QR Bank"
         class="w-64 h-64 object-cover rounded-lg border border-gray-700"
      />
      </div>


      <p class="text-gray-400 text-sm">
         Khi bạn muốn nạp tiền vào ví, hãy chuyển khoản đến tài khoản ngân hàng của chúng tôi
         thông qua QR này với nội dung là <b>wallet + mã số ví của bạn</b>. Sau khi nhận được tiền, chúng tôi sẽ cập nhật số dư trong ví của bạn.
      </p>


    </div>
  </div>
</template>