import cluster from "cluster";
import os from "os";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import TelegramBot from "node-telegram-bot-api";

// database
import db from "./config/database.js";

// Routes
import IndexRoute from "./api/routes/index.js";

if (cluster.isMaster) {
   console.log("this is the master process : ", process.pid);

   // Count the machine's CPUs
   const cpuCount = os.cpus().length;

   // Create a worker for each CPU
   for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
   }

   // Listen for dying workers
   cluster.on("exit", function () {
      cluster.fork();
   });
} else {
   const app = express();
   const port = process.env.PORT || 3000;
   // const pid = process.pid;
   // const server = app.listen(port, () => {
   //    console.log("this is the worker process : ", pid);
   // });

   // Listen to connection
   app.listen(port, () => {
      // console.log(port);
      // console.log('this is the worker process : ', pid);
   });

   app.use((req, res, next) => {
      res.append("Access-Control-Allow-Origin", "*");
      res.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
      res.append("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      next();
   });
   app.use("/uploads", express.static("uploads"));
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());

   mongoose.connect("mongodb://localhost:27017/fullstack-mongodb", {
      auth: { authSource: "admin" },
      user: db.user,
      pass: db.pass,
      useUnifiedTopology: db.config.useUnifiedTopology,
      useNewUrlParser: db.config.useNewUrlParser,
   });
   mongoose.set("useCreateIndex", db.config.useCreateIndex);
   mongoose.set("useFindAndModify", db.config.useFindAndModify);

   // v1: API version 1 => index Routes folder
   app.use("/v1/", IndexRoute);

   /*
      TELEGRAM BOT API
      // replace the value below with the Telegram token you receive from @BotFather
      const token = "1290395436:AAHOp5RUoLWAd81ToPqg2ENsNSeBCYzk4gQ";

      // Create a bot that uses 'polling' to fetch new updates
      const bot = new TelegramBot(token);

      bot.setWebHook(`https://localhost:3000/bot${token}`, {
         certificate: "ssl/cert.pem",
      });
   */
}
