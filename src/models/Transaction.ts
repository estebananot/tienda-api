import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  user: string;  
  city: string;
  location: string;
  restaurants: any[];
  createdAt?: Date;  
  updatedAt?: Date;  
}

const TransactionSchema: Schema = new Schema({
  user: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  restaurants: {
    type: Array,
    required: true,
  },
}, { timestamps: true });

const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
