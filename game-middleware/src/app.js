//src/app.js
const express = require("express");
const app = express();

const checkReceive = require("./handlers/check_receive");

app.get("/check_receiver/:ts_sender", require("./handlers/check_receive"));
app.get("/traded/:ts_id", require("./handlers/traded"));

module.exports = app;