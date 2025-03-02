import { Types } from "mongoose"

export type TTransaction = {
    buyerID: Types.ObjectId,
    sellerID: Types.ObjectId,
    itemID: Types.ObjectId,
    status: "pending" | "complete"
    address?: string,
    tranId?:string
}