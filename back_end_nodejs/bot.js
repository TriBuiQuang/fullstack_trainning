import TelegramBot from "node-telegram-bot-api";
import app from "./config/app.js";

//api.telegram.org/bot1290395436:AAHOp5RUoLWAd81ToPqg2ENsNSeBCYzk4gQ/sendMessage
//https: //api.telegram.org/bot1290395436:AAHOp5RUoLWAd81ToPqg2ENsNSeBCYzk4gQ/getMe

// replace the value below with the Telegram token you receive from @BotFather
const token = app.telegram.token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
console.log("bot", bot);
bot.onText(/\/start/, async (msg, match) => {
   // 'msg' is the received Message from Telegram
   // 'match' is the result of executing the regexp above on the text content
   // of the message

   const chatId = msg.chat.id;
   console.log(chatId);
   const resp = match[1]; // the captured "whatever"
   await bot.sendMessage(
      chatId,
      "Lương của kỹ sư Blockchain tận 42tr/tháng? \n https://thanhnien.vn/giao-duc/nguoi-co-chuyen-mon-blockchain-nhan-luong-hon-45-trieu-dongthang-1060692.html"
   );
   await bot.sendMessage(chatId, "Doremon 4.0 giới thiệu với bạn 1 chương trình rất lý thú để trang bị thêm 100 thuật ngữ liên quan về blockchain");
   await bot.sendMessage(chatId, "Khóa học này 8h và chi phí 100$ bạn đăng ký chứ ?", {
      reply_markup: {
         inline_keyboard: [[{ text: "Đăng kí", callback_data: "1" }]],
      },
   });
});

// Listen for any kind of message. There are different kinds of
// messages.
console.log(
   bot.on("message", (mess) => {
      console.log(mess);
   })
);
bot.on("message", (msg) => {
   const chatId = msg.chat.id;
   console.log(msg);
   // send a message to the chat acknowledging receipt of their message

   const Hi = "hi";
   const Hello = "hello";
   const bye = "bye";

   const txtMess = msg.text.toString().toLowerCase();

   if (txtMess.indexOf(Hi) === 0 || txtMess.indexOf(Hello) === 0) {
      bot.sendMessage(msg.chat.id, "Hello dear user");
   }

   if (txtMess.includes(bye)) {
      bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
   }
});

// Keyboard layout for requesting phone number access
const requestPhoneKeyboard = {
   reply_markup: {
      one_time_keyboard: true,
      keyboard: [
         [
            {
               text: "My phone number",
               request_contact: true,
               one_time_keyboard: true,
            },
         ],
         ["Cancel"],
      ],
   },
};

bot.on("callback_query", async (msg) => {
   const chatId = msg.from.id;
   console.log(msg);
   if (msg.data === "1")
      await bot.sendMessage(chatId, "Đặc biệt hơn nếu thanh toán bằng OPAY bạn chỉ còn 80$ ~ 120 OPAY bạn có tài khoản chưa?", {
         reply_markup: {
            inline_keyboard: [
               [
                  { text: "Đã có", callback_data: "2" },
                  { text: "Đăng kí", callback_data: "3" },
               ],
            ],
         },
      });
   if (msg.data === "2") {
      await bot.sendMessage(
         chatId,
         "Để lại số điện thoại, email để Doremon ghi danh tự động cho bạn nhé, đơn giản thôi tôi là Doremon mà, tôi sẽ thay bạn làm mọi thứ !"
      );
      await bot.sendMessage(chatId, "Hãy nhập họ tên của bạn vào. \n /name [whatever]");
   }
   if (msg.data === "3") {
      await bot.sendMessage(chatId, "Bạn vui lòng tạo tài khoản và ví OPAY tại link này nhé: \n https://opay.ai/register");
      setInterval(
         await bot.sendMessage(chatId, "Bạn có muốn tôi đợi bạn tạo xong tài khoản và ví OPAY rồi tiếp tục?", {
            reply_markup: {
               inline_keyboard: [
                  [
                     { text: "Tiếp tục", callback_data: "2" },
                     { text: "Đợi", callback_data: "4" },
                  ],
               ],
            },
         }),
         10000
      );
   }
   if (msg.data === "4") {
      setInterval(
         await bot.sendMessage(chatId, "Mình vẫn còn ở đây, đợi bạn tạo xong tài khoản và ví OPAY, rồi chúng ta tiếp tục nhé!", {
            reply_markup: {
               inline_keyboard: [[{ text: "Tiếp tục", callback_data: "2" }]],
            },
         }),
         10000
      );
   }
});

// Matches "/name [whatever]"
bot.onText(/\/name (.+)/, async (msg, match) => {
   // 'msg' is the received Message from Telegram
   // 'match' is the result of executing the regexp above on the text content
   // of the message
   const chatId = msg.chat.id;
   const reg = /\b[^\d\W]+\b/g;
   const check = reg.test(match[1]);
   try {
      if (check) {
         await bot.sendMessage(chatId, "Để lại số điện thoại nữa nhé \n /phone [whatever]");
      } else {
         console.log("false");
         await bot.sendMessage(chatId, "Nhập sai xin bạn nhập tên lại !!! \n /name [whatever]");
      }
   } catch (error) {
      console.log(error);
   }
});

bot.onText(/\/phone (.+)/, async (msg, match) => {
   // 'msg' is the received Message from Telegram
   // 'match' is the result of executing the regexp above on the text content
   // of the message
   const chatId = msg.chat.id;
   const reg = /^[0-9\+]{1,}[0-9\-]{3,15}$/;
   const check = reg.test(match[1]);
   try {
      if (check) {
         await bot.sendMessage(chatId, "Còn địa chỉ email nữa là xong thôi \n /email [whatever]");
      } else {
         console.log("false");
         await bot.sendMessage(chatId, "Nhập sai xin bạn nhập phone lại !!! \n /phone [whatever]");
      }
   } catch (error) {
      console.log(error);
   }
});

bot.onText(/\/email (.+)/, async (msg, match) => {
   const chatId = msg.chat.id;
   const reg = /^\S+@\S+$/;
   const check = reg.test(match[1]);
   if (check) {
      await bot.sendMessage(
         chatId,
         "Ghi danh thanh công. \n Doremon sẽ gửi bạn thông tin về lớp học trước 1 ngày, bạn sắp xếp để tham gia học nhé, chúc bạn 1 ngày tốt đẹp"
      );
   } else await bot.sendMessage(chatId, "Nhập sai xin bạn nhập email lại !!! \n /email [whatever]");
});
