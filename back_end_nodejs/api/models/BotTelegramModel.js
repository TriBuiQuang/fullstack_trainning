import mongoose from "mongoose";

const botTelegramSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   user_id: { type: Number, required: true },
   message: [
      {
         from: {
            id: { type: Number, required: true },
            is_bot: { type: Boolean, default: false },
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },
            language_code: { type: String, default: "en" },
         },
         chat: {
            id: { type: Number, required: true },
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },
            type: { type: String, required: true, default: "private" }, //private, public
         },
         //convert date
         //  myDate = new Date(1000*date);
         reply_markup: { inline_keyboard: [{ text: { type: String, required: true }, callback_data: { type: String, required: true } }] },
         date: { type: Number, default: Date.parse(new Date()) },
         text: { type: String, required: true },
      },
   ],
});

export default mongoose.model("BotTelegram", botTelegramSchema);
