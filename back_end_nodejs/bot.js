import TelegramBot from "node-telegram-bot-api";

import mongoose from "mongoose";

import BotTelegramModel from "./api/models/BotTelegramModel.js";
// database
import db from "./config/database.js";
import app from "./config/app.js";

mongoose.connect("mongodb://localhost:27017/fullstack-mongodb", {
   auth: { authSource: "admin" },
   user: db.user,
   pass: db.pass,
   useUnifiedTopology: db.config.useUnifiedTopology,
   useNewUrlParser: db.config.useNewUrlParser,
});
mongoose.set("useCreateIndex", db.config.useCreateIndex);
mongoose.set("useFindAndModify", db.config.useFindAndModify);

//api.telegram.org/bot1290395436:AAHOp5RUoLWAd81ToPqg2ENsNSeBCYzk4gQ/sendMessage
//https: //api.telegram.org/bot1290395436:AAHOp5RUoLWAd81ToPqg2ENsNSeBCYzk4gQ/getMe

// replace the value below with the Telegram token you receive from @BotFather
const token = app.telegram.token;

let botID, botFirstName, botLastName;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
bot.getMe()
   .then((mess) => {
      botID = mess.id;
      botFirstName = mess.first_name;
      botLastName = mess.last_name;
   })
   .catch(console.err);

// function we use
const BotTelegramData = (chat_id, first_name, last_name, txtMessage, bot_id, replyMarkup) => {
   console.log(replyMarkup || "");
   return {
      from: {
         id: bot_id || chat_id,
         is_bot: bot_id ? true : false,
         first_name: bot_id ? botFirstName : first_name,
         last_name: bot_id ? botLastName : last_name,
      },
      chat: {
         id: chat_id,
         first_name: first_name,
         last_name: last_name,
      },
      text: txtMessage,
      reply_markup: replyMarkup || "",
   };
};

async function delay(ms) {
   // return await for better async stack trace support in case of errors.
   return await new Promise((resolve) => setTimeout(resolve, ms));
}
// end function we use

bot.onText(/\/start/, async (msg, match) => {
   // 'msg' is the received Message from Telegram
   // 'match' is the result of executing the regexp above on the text content
   // of the message
   const chatId = msg.chat.id;
   const { first_name, last_name } = msg.chat;
   let txtMessage,
      replyMarkup,
      arr = [];
   let chat = await BotTelegramModel.findOne({ user_id: chatId });
   // if not exists user_id telegram , create new collection
   if (chat === null) {
      let chat = new BotTelegramModel({ _id: mongoose.Types.ObjectId() });
      chat.user_id = chatId;
      await chat.save();
   }
   //telegram send data back to user
   arr.push(BotTelegramData(chatId, first_name, last_name, msg.text));
   txtMessage =
      "Lương của kỹ sư Blockchain tận 42tr/tháng? \n https://thanhnien.vn/giao-duc/nguoi-co-chuyen-mon-blockchain-nhan-luong-hon-45-trieu-dongthang-1060692.html";
   await bot.sendMessage(chatId, txtMessage);
   arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage));

   txtMessage = "Doremon 4.0 giới thiệu với bạn 1 chương trình rất lý thú để trang bị thêm 100 thuật ngữ liên quan về blockchain";
   await bot.sendMessage(chatId, txtMessage);
   arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage));

   txtMessage = "Khóa học này 8h và chi phí 100$ bạn đăng ký chứ ?";
   replyMarkup = { inline_keyboard: [[{ text: "Đăng kí", callback_data: "1" }]] };
   await bot.sendMessage(chatId, txtMessage, { reply_markup: replyMarkup });
   arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage, botID, replyMarkup));
   //save
   await BotTelegramModel.updateOne({ user_id: chatId }, { $push: { message: arr } });
});

bot.on("callback_query", async (msg) => {
   const chatId = msg.from.id;
   let txtMessage,
      replyMarkup,
      arr = [];
   let checkType = 1;
   const { first_name, last_name } = msg.message.chat;
   if (msg.data === "1") {
      txtMessage = "Đặc biệt hơn nếu thanh toán bằng OPAY bạn chỉ còn 80$ ~ 120 OPAY bạn có tài khoản chưa?";
      replyMarkup = {
         inline_keyboard: [
            [
               { text: "Đã có", callback_data: "2" },
               { text: "Đăng kí", callback_data: "3" },
            ],
         ],
      };
      await bot.sendMessage(chatId, txtMessage, { reply_markup: replyMarkup });
      arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage, botID, replyMarkup));
   }
   if (msg.data === "2") {
      await bot.sendMessage(
         chatId,
         "Để lại số điện thoại, email để Doremon ghi danh tự động cho bạn nhé, đơn giản thôi tôi là Doremon mà, tôi sẽ thay bạn làm mọi thứ !"
      );
      await bot.sendMessage(chatId, "Hãy nhập họ tên của bạn vào. ");
      arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage, botID));

      console.log("before go message");
      console.log("checktype ", checkType);

      bot.on("message", async (msg) => {
         const chatId = msg.chat.id;

         let txtMessage,
            arr = [];
         const { first_name, last_name } = msg.chat;
         try {
            arr.push(BotTelegramData(chatId, first_name, last_name, msg.text));
            if (checkType === 1) {
               const reg = /\b[^\d\W]+\b/g;
               const check = reg.test(msg.text);
               if (check) {
                  txtMessage = "Để lại số điện thoại nữa nhé ";
                  checkType += 1;
                  console.log("ben tron message on", checkType);
               } else {
                  txtMessage = "Nhập sai xin bạn nhập tên lại !!!";
               }
            } else if (checkType === 2) {
               const reg = /^[0-9\+]{1,}[0-9\-]{3,15}$/;
               const check = reg.test(msg.text);
               if (check) {
                  txtMessage = "Còn địa chỉ email nữa là xong thôi ";
                  checkType += 1;
               } else {
                  txtMessage = "Nhập sai xin bạn nhập phone lại !!! ";
               }
            } else if (checkType === 3) {
               const reg = /^\S+@\S+$/;
               const check = reg.test(msg.txt);
               if (check) {
                  txtMessage =
                     "Ghi danh thanh công. \n Doremon sẽ gửi bạn thông tin về lớp học trước 1 ngày, bạn sắp xếp để tham gia học nhé, chúc bạn 1 ngày tốt đẹp";
               } else txtMessage = "Nhập sai xin bạn nhập email lại !!! \n /email [whatever]";
            }

            await bot.sendMessage(chatId, txtMessage);
            arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage, botID));
            //save
            await BotTelegramModel.updateOne({ user_id: chatId }, { $push: { message: arr } });
         } catch (error) {
            console.log(error);
         }
      });
   }
   if (msg.data === "3") {
      txtMessage = "Bạn vui lòng tạo tài khoản và ví OPAY tại link này nhé: \n https://opay.ai/register";
      await bot.sendMessage(chatId, txtMessage);
      arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage, botID, replyMarkup));

      txtMessage = "Bạn có muốn tôi đợi bạn tạo xong tài khoản và ví OPAY rồi tiếp tục?";
      replyMarkup = {
         inline_keyboard: [
            [
               { text: "Tiếp tục", callback_data: "2" },
               { text: "Đợi", callback_data: "4" },
            ],
         ],
      };
      await delay(2000);
      await bot.sendMessage(chatId, txtMessage, { reply_markup: replyMarkup });
      arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage, botID, replyMarkup));
   }
   if (msg.data === "4") {
      await delay(2000);
      txtMessage = "Mình vẫn còn ở đây, đợi bạn tạo xong tài khoản và ví OPAY, rồi chúng ta tiếp tục nhé!";
      replyMarkup = {
         inline_keyboard: [[{ text: "Tiếp tục", callback_data: "2" }]],
      };
      await bot.sendMessage(chatId, txtMessage, { reply_markup: replyMarkup });
      arr.push(BotTelegramData(chatId, first_name, last_name, txtMessage, botID, replyMarkup));
   }
   //save
   await BotTelegramModel.updateOne({ user_id: chatId }, { $push: { message: arr } });
});
