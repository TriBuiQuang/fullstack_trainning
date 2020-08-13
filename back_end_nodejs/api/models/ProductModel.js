import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: { type: String, required: true },
   type: { type: String, required: true },
   belong: { type: String, required: true },
   created_at: { type: Date, default: Date.now },
   updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
