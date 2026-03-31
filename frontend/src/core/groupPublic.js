import axios from "axios";
import { getUserIdFromToken } from "@/core/token";

const BASE_URL = "http://localhost:8055";

/* =======================================================
   🔹 1. LẤY SỐ MEMBER TỪ GROUP (g_member)
   ======================================================= */
export const get_member_group = async (g_id) => {
  try {
    const res = await axios.get(`${BASE_URL}/items/group/${g_id}`, {
      params: {
        fields: ["g_id", "g_member"],
      },
    });

    return res.data.data.g_member || 0;
  } catch (err) {
    console.error("get_member_group error:", err);
    return 0;
  }
};

/* =======================================================
   🔹 2. ADD MEMBER + UPDATE GROUP
   ======================================================= */
export const add_member = async (g_id) => {
  try {
    const u_id = getUserIdFromToken();

    if (!u_id) throw new Error("No user");

    console.log("Join group:", g_id, u_id);

    // 👉 1. tạo group_member
    await axios.post(`${BASE_URL}/items/group_member`, {
      g_id: Number(g_id),
      u_id: u_id,
    });

    // 👉 2. lấy số member hiện tại từ group
    const current = await get_member_group(g_id);

    const newCount = current + 1;

    // 👉 3. chuẩn bị update
    const updateData = {
      g_member: newCount,
    };

    // 👉 4. nếu >= 5 thì Active
    if (newCount >= 5) {
      updateData.status = "Active";
    }

    // 👉 5. update group
    await axios.patch(`${BASE_URL}/items/group/${g_id}`, updateData);

    return {
      success: true,
      count: newCount,
      activated: newCount >= 5,
    };

  } catch (err) {
    console.error("add_member error:", err);
    return {
      success: false,
    };
  }
};