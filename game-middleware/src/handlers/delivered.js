//src/handlers/traded.js
const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { ts_id } = req.params;

    await connect.patch(`/items/trade_session/${ts_id}`, {
      status: "Delivered",
    });
    res.send("OK");
  } catch (err) {
    console.error("DELIVERED ERROR:", err);
    res.send("");
  }
};