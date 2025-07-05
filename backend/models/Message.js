import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
  isBot: Boolean,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
