import { Types } from "mongoose"

export type TListing = {
    title:string,
    description:string,
    price:string,
    condition:string,
    images:string[],
    userID:Types.ObjectId,
    status:"available" | "sold"
}