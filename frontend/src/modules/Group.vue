<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/core/api";
import { add_member } from "@/core/groupPublic";

const groupMembers = ref([]);
const tradingPlans = ref([]);
const loading = ref(false);
const joinGroupId = ref("");

// 🔹 1. Fetch trading_plan
const fetchTradingPlans = async () => {
  try {
    const res = await api.get("/items/trading_plan");
    tradingPlans.value = res.data.data;
  } catch (err) {
    console.error("Fetch trading_plan error:", err);
  }
};

// 🔹 2. Fetch group_member (có token → chỉ group của mình)
const fetchMyGroups = async () => {
  try {
    const res = await api.get("/items/group_member", {
      params: {
        fields: ["gm_id", "g_id.*"],
      },
    });

    groupMembers.value = res.data.data;
  } catch (err) {
    console.error("Fetch group_member error:", err);
  }
};

// 🔹 3. Map trading_plan
const planMap = computed(() => {
  const map = {};
  tradingPlans.value.forEach((p) => {
    map[p.tp_id] = p;
  });
  return map;
});

// 🔹 4. Create group (có token)
const createGroup = async () => {
  try {
    loading.value = true;

    await api.post("/items/group");

    alert("✅ Đã tạo group mới!");
    await fetchMyGroups();
  } catch (err) {
    console.error("Create group error:", err);
    alert("❌ Lỗi tạo group!");
  } finally {
    loading.value = false;
  }
};

// 🔹 5. Check đã join chưa
const isJoined = (g_id) => {
  return groupMembers.value.some((gm) => gm.g_id?.g_id == g_id);
};

// 🔹 6. Join group (dùng groupPublic)
const joinGroup = async () => {
  if (!joinGroupId.value) return;

  if (isJoined(joinGroupId.value)) {
    alert("⚠️ Bạn đã tham gia group này rồi!");
    return;
  }

  try {
    loading.value = true;

    const res = await add_member(joinGroupId.value);

    if (!res.success) throw new Error();

    joinGroupId.value = "";

    await fetchMyGroups();

    alert(`✅ Members: ${res.count}`);

    if (res.activated) {
      alert("🔥 Group đã đủ 5 người → ACTIVE!");
    }

  } catch (err) {
    console.error("Join group error:", err);
    alert("❌ Join thất bại!");
  } finally {
    loading.value = false;
  }
};

// 🔹 Init
onMounted(async () => {
  await fetchTradingPlans();
  await fetchMyGroups();
});
</script>

<template>
  <div class="p-6 text-white space-y-6">

    <!-- 🟢 CREATE GROUP -->
    <div class="bg-gray-800 p-4 rounded-lg">
      <button
        @click="createGroup"
        :disabled="loading"
        class="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        {{ loading ? "Đang tạo..." : "➕ Create Group" }}
      </button>
    </div>

    <!-- 🟡 JOIN GROUP -->
    <div class="bg-gray-800 p-4 rounded-lg">
      <h2 class="text-lg font-bold mb-3">🔗 Join Group</h2>

      <div class="flex gap-2">
        <input
          v-model="joinGroupId"
          placeholder="Nhập Group ID..."
          class="flex-1 p-2 rounded bg-gray-700"
        />

        <button
          @click="joinGroup"
          :disabled="loading"
          class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {{ loading ? "Đang join..." : "Join" }}
        </button>
      </div>
    </div>

    <!-- 🔵 LIST GROUP -->
    <div class="bg-gray-800 p-4 rounded-lg">
      <h2 class="text-lg font-bold mb-3">👥 Group của bạn</h2>

      <div v-if="groupMembers.length === 0">
        Bạn chưa có group nào
      </div>

      <div
        v-for="gm in groupMembers"
        :key="gm.gm_id"
        class="p-4 border-b border-gray-700 space-y-1"
      >
        <!-- 🆔 Group -->
        <div class="font-semibold text-lg">
          Group #{{ gm.g_id?.g_id }}
        </div>

        <!-- 👥 Members -->
        <div class="text-sm text-yellow-400">
          Members: {{ gm.g_id?.g_member || 0 }}/5
        </div>

        <!-- 📌 Status -->
        <div class="text-sm text-gray-400">
          Status:
          <span
            :class="{
              'text-yellow-400': gm.g_id?.status === 'Pending',
              'text-green-400': gm.g_id?.status === 'Active'
            }"
          >
            {{ gm.g_id?.status }}
          </span>
        </div>

        <!-- 🔥 Trading Plan -->
        <template v-if="planMap[gm.g_id?.tp_id]">
          <div class="text-sm text-blue-400">
            Plan: {{ planMap[gm.g_id.tp_id].tp_name }}
          </div>

          <div class="text-sm text-green-400">
            Fee: {{ planMap[gm.g_id.tp_id].tp_fee }} VND
          </div>

          <div class="text-sm text-gray-400">
            Time: {{ planMap[gm.g_id.tp_id].tp_time }}
          </div>
        </template>

        <div v-else class="text-sm text-gray-500">
          No plan
        </div>
      </div>
    </div>
  </div>
</template>