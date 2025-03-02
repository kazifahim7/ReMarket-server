import { Schema, model, Types } from "mongoose";
import { TTransaction } from "./transaction.interface";


const transactionSchema = new Schema<TTransaction>(
    {
        buyerID: { type: Schema.Types.ObjectId, ref: "user", required: [true, 'buyerID is required'] },
        sellerID: { type: Schema.Types.ObjectId, ref: "user", required: [true, 'sellerID is required'] },
        itemID: { type: Schema.Types.ObjectId, ref: "Listing", required: [true, 'itemID is required'] },
        status: { type: String, enum: ["pending", "complete"], default: "pending" },
        address: { type: String },
        tranId: { type: String , unique:true},
    },
    { timestamps: true }
);

// Create the model
const TransactionModel = model<TTransaction>("Transaction", transactionSchema);

export default TransactionModel;
