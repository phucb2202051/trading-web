const { get, patch } = require("../connect");

module.exports = async (req, res) => {
  try {
    const { nick_name, status, map, zone } = req.params;

    // 🔹 validate số
    const mapNum = map;
    const zoneNum = parseInt(zone);

    // 🔹 1. tìm nick
    const nickRes = await get("/items/nick", {
      "filter[n_char_name][_eq]": nick_name,
      limit: 1,
    });


    if (!nickRes.data.length) {
      return res.send("");
    }

    const nick = nickRes.data[0];

    // 🔹 2. update
    await patch(`/items/nick/${nick.n_id}`, {
      status: status,
      map: mapNum,
      zone: zoneNum,
    });

    return res.send("ok");
  } catch (err) {
    console.error("update_nick error:", err.message);
    return res.send("");
  }
};