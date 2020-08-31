import TG from "telegram-bot-api";
import mongoose from "mongoose";

import Chat from "../models/ChatModel.js";

import logger from "../middlewares/logger.js";
import appconstants from "../../config/app.js";

const api = new TG({ token: appconstants.telegram.token });

// https://oauth.telegram.org/auth/request?bot_id=547043436&origin=https%3A%2F%2Fcore.telegram.org&embed=1&request_access=write
// Request Method: POST

//https://oauth.telegram.org/auth/login?bot_id=547043436&origin=https%3A%2F%2Fcore.telegram.org&embed=1&request_access=write
// https://oauth.telegram.org/auth/get?bot_id=547043436&lang=en
let bot_id;
api.getMe()
   .then((mess) => (bot_id = mess.id))
   .catch(console.err);

async function delay(ms) {
   // return await for better async stack trace support in case of errors.
   return await new Promise((resolve) => setTimeout(resolve, ms));
}

// Define your message provider
const mp = new TG.GetUpdateMessageProvider();

const chat_id = 1186235871;
// Set message provider and start API
api.setMessageProvider(mp);
api.start()
   .then(() => {
      console.log("API is started");
   })
   .catch(console.err);

// Receive messages via event callback
api.on("update", (update) => {
   // update object is defined at
   // https://core.telegram.org/bots/api#update
   console.log(update);
});

const GetTelegramAPI = async (req, res) => {
   try {
      logger.info("Start GetTelegramAPI");
      let { limit, offset } = req.query;

      limit = parseInt(limit);
      offset = parseInt(offset);
      if (isNaN(limit) === true) limit = 5;
      if (isNaN(offset) === true) offset = 0;

      const total = await Chat.countDocuments({ user_id: req.auth.userId });
      const chat = await Chat.find({ user_id: req.auth.userId }).sort("-created_at").skip(offset).limit(limit).select("-__v");

      logger.info("Stop GetTelegramAPI");

      return res.status(200).json({ total: total, data: chat });
   } catch (error) {
      logger.error("Error GetTelegramAPI " + error);

      return res.status(500).json({ message: error });
   }
};

const SendMessage = async (req, res) => {
   try {
      const { text, data, checkName, checkPhone, checkEmail } = req.body;
      let reg;
      let check, txtMessage;
      let chat = await Chat.findOne({ user_id: req.auth.userId });
      let arr = [
         {
            from: {
               id: chat_id,
               is_bot: false,
               first_name: "tri",
               last_name: "bui quang",
            },
            chat: {
               id: chat_id,
               first_name: "tri",
               last_name: "bui quang",
            },
            date: Date.parse(new Date()),
            text: text,
         },
      ];

      if (chat === null) {
         let chat = new Chat({ _id: mongoose.Types.ObjectId() });

         chat.user_id = req.auth.userId;
         await chat.save();
      }
      chat = await Chat.update({ user_id: req.auth.userId });
      if (text.toLowerCase().indexOf("start") === 0) {
         txtMessage =
            "Lương của kỹ sư Blockchain tận 42tr/tháng? \n https://thanhnien.vn/giao-duc/nguoi-co-chuyen-mon-blockchain-nhan-luong-hon-45-trieu-dongthang-1060692.html";
         await api.sendMessage({
            chat_id: chat_id,
            text: txtMessage,
         });
         arr.push({
            from: {
               id: bot_id,
               is_bot: true,
               first_name: "Testing_Bot",
               last_name: "tribuiquang_testing_telegram_bot",
            },
            chat: {
               id: chat_id,
               first_name: "tri",
               last_name: "bui quang",
            },
            date: Date.parse(new Date()),
            text: txtMessage,
         });
         txtMessage = "Doremon 4.0 giới thiệu với bạn 1 chương trình rất lý thú để trang bị thêm 100 thuật ngữ liên quan về blockchain";
         await api.sendMessage({
            chat_id: chat_id,
            text: txtMessage,
         });
         arr.push({
            from: {
               id: bot_id,
               is_bot: true,
               first_name: "Testing_Bot",
               last_name: "tribuiquang_testing_telegram_bot",
            },
            chat: {
               id: chat_id,
               first_name: "tri",
               last_name: "bui quang",
            },
            date: Date.parse(new Date()),
            text: txtMessage,
         });
         txtMessage = "Khóa học này 8h và chi phí 100$ bạn đăng ký chứ ?";
         await api.sendMessage({
            chat_id: chat_id,
            text: txtMessage,
            reply_markup: {
               inline_keyboard: [[{ text: "Đăng kí", callback_data: "1" }]],
            },
         });
         arr.push({
            from: {
               id: bot_id,
               is_bot: true,
               first_name: "Testing_Bot",
               last_name: "tribuiquang_testing_telegram_bot",
            },
            chat: {
               id: chat_id,
               first_name: "tri",
               last_name: "bui quang",
            },
            date: Date.parse(new Date()),
            text: txtMessage,
         });
      }
      console.log(text, data);
      if (text === "callback_data") {
         if (data === "1")
            await api.sendMessage({
               chat_id: chat_id,
               text: "Đặc biệt hơn nếu thanh toán bằng OPAY bạn chỉ còn 80$ ~ 120 OPAY bạn có tài khoản chưa?",
               reply_markup: {
                  inline_keyboard: [
                     [
                        { text: "Đã có", callback_data: "2" },
                        { text: "Đăng kí", callback_data: "3" },
                     ],
                  ],
               },
            });
         if (data === "2") {
            await api.sendMessage({
               chat_id: chat_id,
               text:
                  "Để lại số điện thoại, email để Doremon ghi danh tự động cho bạn nhé, đơn giản thôi tôi là Doremon mà, tôi sẽ thay bạn làm mọi thứ !",
            });
            await api.sendMessage({ chat_id: chat_id, text: "Hãy nhập họ tên của bạn vào. \n /name [whatever]" });
         }
         if (data === "3") {
            await api.sendMessage({ chat_id: chat_id, text: "Bạn vui lòng tạo tài khoản và ví OPAY tại link này nhé: \n https://opay.ai/register" });
            console.log("gohere");
            await delay(2000);
            await api.sendMessage({
               chat_id: chat_id,
               text: "Bạn có muốn tôi đợi bạn tạo xong tài khoản và ví OPAY rồi tiếp tục?",
               reply_markup: {
                  inline_keyboard: [
                     [
                        { text: "Tiếp tục", callback_data: "2" },
                        { text: "Đợi", callback_data: "4" },
                     ],
                  ],
               },
            });
         }
         if (data === "4") {
            await delay(2000);
            await api.sendMessage({
               chat_id: chat_id,
               text: "Mình vẫn còn ở đây, đợi bạn tạo xong tài khoản và ví OPAY, rồi chúng ta tiếp tục nhé!",
               reply_markup: {
                  inline_keyboard: [[{ text: "Tiếp tục", callback_data: "2" }]],
               },
            });
         }
      }
      if (checkName && checkName === true) {
         reg = /\b[^\d\W]+\b/g;
         check = reg.test(text);
         if (check) await api.sendMessage({ chat_id: chat_id, text: "Để lại số điện thoại nữa nhé \n /phone [whatever]" });
         else await api.sendMessage({ chat_id: chatId, text: "Nhập sai xin bạn nhập tên lại !!! \n /name [whatever]" });
      }

      if (checkPhone && checkPhone === true) {
         reg = /^[0-9\+]{1,}[0-9\-]{3,15}$/;
         check = reg.test(text);
         if (check) await api.sendMessage({ chat_id: chat_id, text: "Còn địa chỉ email nữa là xong thôi \n /email [whatever]" });
         else await api.sendMessage({ chat_id: chat_id, text: "Nhập sai xin bạn nhập phone lại !!! \n /phone [whatever]" });
      }

      if (checkEmail && checkEmail === true) {
         reg = /^\S+@\S+$/;
         check = reg.test(text);
         if (check) {
            await api.sendMessage({
               chat_id: chat_id,
               text:
                  "Ghi danh thanh công. \n Doremon sẽ gửi bạn thông tin về lớp học trước 1 ngày, bạn sắp xếp để tham gia học nhé, chúc bạn 1 ngày tốt đẹp",
            });
         } else await api.sendMessage({ chat_id: chat_id, text: "Nhập sai xin bạn nhập email lại !!! \n /email [whatever]" });
      }

      if (text.includes("bye")) {
         api.sendMessage({ chat_id: chat_id, text: "Hope to see you around again , Bye" });
      }

      logger.info("Stop SendMessage");
      console.log(arr);
      await Chat.update({ user_id: req.auth.userId }, { $push: { message: arr } });
      return res.status(200).json({ message: text });
   } catch (error) {
      logger.error("Error SendMessage " + error);

      return res.status(500).json({ message: error });
   }
};

export { GetTelegramAPI, SendMessage };
