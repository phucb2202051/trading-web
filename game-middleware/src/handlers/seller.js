const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { ts_id } = req.params;
    if (!ts_id) return res.send("");

    const result = await connect.get(`/items/trade_session/${ts_id}`, {
      params: {
        fields: ["u_seller_id"],
      },
    });

    // handle cả 2 kiểu response
    const trade = result.data?.data || result.data;

    return res.send(trade?.u_seller_id || "");
  } catch (err) {
    console.error("SELLER ERROR:", err);
    res.send("");
  }
};