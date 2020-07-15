import mongoose from 'mongoose';

const TransactionSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  yearMonth: {
    type: String,
  },
  yearMonthDay: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.model('transaction', TransactionSchema);
