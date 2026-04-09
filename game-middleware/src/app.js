//src/app.js
const express = require("express");
const app = express();

const checkReceive = require("./handlers/check_receive");

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/nap_tien/", require("./handlers/nap_tien"));
app.get("/check_receiver/:ts_sender", require("./handlers/check_receive"));
app.get("/traded/:ts_id", require("./handlers/traded"));
app.get("/delivered/:ts_id", require("./handlers/delivered"));
app.get("/status/:ts_id", require("./handlers/status"));
app.get("/receiver/:ts_id", require("./handlers/receiver"));
app.get("/buyer/:ts_id", require("./handlers/buyer"));
app.get("/seller/:ts_id", require("./handlers/seller"));
app.get("/price/:ts_id", require("./handlers/price"));
app.get("/fee/:user_id", require("./handlers/fee"));
app.get("/withdraw/:u_id/:amount", require("./handlers/withdraw"));
app.get("/recharge/:u_id/:amount", require("./handlers/recharge"));
app.get("/num/:ts_id/:num", require("./handlers/num"));
app.get("/update_nick/:nick_name/:status/:map/:zone", require("./handlers/update_nick"));

module.exports = app;