import express from "express";

import { GetTelegramAPI, SendMessage } from "../controllers/TelegramController.js";

import check_auth from "../middlewares/check_auth.js";

const app = express();

app.get("/", check_auth, GetTelegramAPI);
app.post("/", check_auth, SendMessage);

export default app;
