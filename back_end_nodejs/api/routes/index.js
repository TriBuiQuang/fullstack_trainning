import express from "express";

import UserRoute from "./UserRoute.js";
import ProductRoute from "./ProductRoute.js";
import StatisticRoute from "./StatisticRoute.js";
import TelegramRoute from "./TelegramRoute.js";

const app = express();

// This is router global.
app.use("/user/", UserRoute);
app.use("/product/", ProductRoute);
app.use("/statistic/", StatisticRoute);

// app.use("/telegram/", check_auth, function (req, res, next) {
//    console.log("testing", req.auth);
//    if (req.auth) import("./TelegramRoute.js");
//    next();
// });
app.use("/telegram/", TelegramRoute);

export default app;
