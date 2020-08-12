import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   username: {
      type: String,
      required: false,
      index: true,
      unique: true,
      sparse: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
   },
   password: { type: String, required: true },
   first_name: { type: String, required: false },
   last_name: { type: String, required: false },
   gender: { type: Boolean, default: true },
   phone: { type: Number, required: false },

   country: { type: String, default: '' },
   city: { type: String, default: '' },
   address: { type: String, default: '' },

   is_superuser: { type: Boolean, required: true, default: false },
   user_image: { type: String, default: '' },

   created_at: { type: Date, default: Date.now },
   updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
