import { Types } from "mongoose";
import { TTransaction } from "./transaction.interface";
import { userModel } from "../Auth/auth.model";
import AppError from "../../Error/AppError";
import { ListingModel } from "../listing/listing.model";
import TransactionModel from "./transaction.model";


import config from "../../config";
import { sendEmail } from "../../utils/SendMessage";

const createTransactionInDB = async (payload: TTransaction, buyerID: Types.ObjectId) => {
    // Buyer check
    const isBuyerExists = await userModel.findById(buyerID);
    if (!isBuyerExists) {
        throw new AppError(403, "You are not authorized");
    }
    if (isBuyerExists.isBlocked) {
        throw new AppError(403, "You are blocked");
    }
    payload.buyerID = buyerID;

    // Seller check
    const isSellerExists = await userModel.findById(payload.sellerID);
    if (!isSellerExists) {
        throw new AppError(404, "Product owner is not available");
    }
    if (isSellerExists.isBlocked) {
        throw new AppError(403, "Seller is blocked");
    }

    // Product check
    const isProductExist = await ListingModel.findById(payload.itemID); // Use itemID instead of sellerID
    if (!isProductExist) {
        throw new AppError(404, "Product not available");
    }
    if (isProductExist.status === "sold") {
        throw new AppError(500, "This Product is already sold");
    }

    if(isProductExist.userID===isBuyerExists._id){
        throw new AppError(500, "sorry this is your product");
    }

    // Generate transaction ID
    payload.tranId = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;

    // Create transaction in DB
    const result = await TransactionModel.create(payload);


    if(result){
        const isProductExist = await ListingModel.findByIdAndUpdate(payload.itemID,{status:"sold"},{new:true});
    }

    // Send emails to Buyer & Seller
    const buyerEmailHTML = `
        <h3>Transaction Successful</h3>
        <p>Dear ${isBuyerExists.name},</p>
        <p>Your purchase for <b>${isProductExist.title}</b> was successful.</p>
        <p>Transaction ID: <b>${payload.tranId}</b></p>
        <p>Thank you for your purchase!</p>
    `;

    const sellerEmailHTML = `
        <h3>Product Sold</h3>
        <p>Dear ${isSellerExists.name},</p>
        <p>Your product <b>${isProductExist.title}</b> has been sold.</p>
        <p>Buyer Transaction ID: <b>${payload.tranId}</b></p>
        <p>Thank you for using our platform!</p>
    `;

    // Send emails asynchronously
    await Promise.all([
        sendEmail(isBuyerExists.email, buyerEmailHTML, config.smtp_user!, "Purchase Confirmation"),
        sendEmail(isSellerExists.email, sellerEmailHTML, config.smtp_user!, "Your Product Has Been Sold"),
    ]);

    return result;
};







export const transactionService = {
    createTransactionInDB
}