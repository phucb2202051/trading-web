const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) return res.send("");

    // B1: lấy group_member
   const gmRes = await connect.get(
   `/items/group_member?filter[u_id][_eq]=${user_id}&fields=g_id`
   );

    const members = gmRes.data?.data || gmRes.data;
    if (!members || members.length === 0) return res.send("");

    // lấy danh sách g_id (unique)
    const groupIds = [...new Set(members.map(m => m.g_id))];

    // B2: lấy group → tp_id
      const groupRes = await connect.get(
      `/items/group?filter[g_id][_in]=${groupIds.join(",")}&filter[status][_eq]=Active&fields=tp_id`
      );


    const groups = groupRes.data?.data || groupRes.data;
    if (!groups || groups.length === 0) return res.send("");

    const tpIds = [...new Set(groups.map(g => g.tp_id))];

    // B3: lấy trading_plan → tp_fee
      const tpRes = await connect.get(
      `/items/trading_plan?filter[tp_id][_in]=${tpIds.join(",")}&fields=tp_fee`
      );

    const plans = tpRes.data?.data || tpRes.data;
    if (!plans || plans.length === 0) return res.send("");

    const fees = plans.map(p => p.tp_fee).filter(f => f != null);

    if (fees.length === 0) return res.send("");

    const minFee = Math.min(...fees);

    return res.send(`${minFee}`);
  } catch (err) {
    console.error("FEE ERROR:", err);
    res.send("");
  }
};