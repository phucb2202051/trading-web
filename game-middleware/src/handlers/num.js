const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { ts_id, num } = req.params;
    if (!ts_id || !num) return res.send("");

    const n = Number(num);
    if (isNaN(n) || n < 0) return res.send("");

    // update ts_num_of_item
    await connect.patch(`/items/trade_session/${ts_id}`, {
      ts_num_of_item: n,
    });

    return res.send("ok");
  } catch (err) {
    console.error("NUM ERROR:", err);
    res.send("");
  }
};