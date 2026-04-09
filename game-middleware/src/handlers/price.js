const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { ts_id } = req.params;
    if (!ts_id) return res.send("");

    const result = await connect.get(`/items/trade_session/${ts_id}`, {
      params: {
        fields: ["ts_price"],
      },
    });

    // handle cả 2 kiểu response
    const trade = result.data?.data || result.data;

    return res.send(trade?.ts_price ? `${trade.ts_price}` : "");
  } catch (err) {
    console.error("PRICE ERROR:", err);
    res.send("");
  }
};