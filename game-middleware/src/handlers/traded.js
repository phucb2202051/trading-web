//src/handlers/traded.js
const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { ts_id } = req.params;

    await connect.patch(`/items/trade_session/${ts_id}`, {
      status: "Traded",
    });

  } catch (err) {
    console.error("TRADED ERROR:", err);
    res.send("");
  }
};