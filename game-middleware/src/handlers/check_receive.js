// src/handlers/check_receive.js
const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { ts_sender } = req.params;

    const result = await connect.get("/items/trade_session", {
      params: {
        filter: {
          ts_sender: { _eq: ts_sender },
          status: { _eq: "Invited" },
        },
        fields: ["ts_id"],
      },
    });

    const trade = result.data?.[0];

    return res.send(trade ? `${trade.ts_id}` : "");
  } catch (err) {
    console.error("CHECK_RECEIVE ERROR:", err);
    res.send("error");
  }
};