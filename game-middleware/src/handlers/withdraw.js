const connect = require("../connect");

module.exports = async (req, res) => {
  try {
    const { u_id, amount } = req.params;
    if (!u_id || !amount) return res.send("");

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) return res.send("");

    // B1: lấy wallet theo u_id
    const wRes = await connect.get(
      `/items/wallet?filter[u_id][_eq]=${u_id}&fields=w_id,w_balance`
    );


    const wallets = wRes.data;
    if (!wallets.length) return res.send("");

    const wallet = wallets[0];
    const { w_id, w_balance } = wallet;

    // B2: check đủ tiền
    if (w_balance < amt) return res.send("");

    // B3: update balance
    const newBalance = w_balance - amt;


    await connect.patch(`/items/wallet/${w_id}`, {
      w_balance: newBalance,
    });

    // B4: tạo transaction
    await connect.post("/items/wallet_transaction", {
      w_id: w_id,
      wt_amount: amt,
      wt_content: "trading fee",
      wt_type: "withdraw",
      status: "Success",
    });

    return res.send("ok");
  } catch (err) {
    console.error("WITHDRAW ERROR:", err);
    res.send("");
  }
};