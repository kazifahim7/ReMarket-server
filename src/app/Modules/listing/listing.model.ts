import { model, Schema, Types } from "mongoose";
import { TListing } from "./listing.interface";

const ListingSchema = new Schema<TListing>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        condition: { type: String, required: true },
        images: { type: [String], required: true },
        userID: { type: Schema.Types.ObjectId, ref: "user", required: true },
        status: { type: String, enum: ["available", "sold"], default: "available" },
    },
    {
        timestamps: true, 
    }
);

export const ListingModel = model<TListing>("Listing", ListingSchema);