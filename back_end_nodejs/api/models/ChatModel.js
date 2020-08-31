import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   user_id: { type: String, required: true },
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
         date: { type: Number, required: true },
         text: { type: String, required: true },
      },
   ],
});

export default mongoose.model("Chat", chatSchema);
