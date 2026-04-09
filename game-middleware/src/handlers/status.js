const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { ts_id } = req.params;
    if (!ts_id) return res.send("");

    const result = await connect.get(`/items/trade_session/${ts_id}`);

    // handle cả 2 kiểu response
    const trade = result.data?.data || result.data;

    return res.send(trade?.status || "");
  } catch (err) {
    console.error("STATUS ERROR:", err);
    res.send("");
  }
};