import { Types } from "mongoose";
import { TListing } from "./listing.interface";
import { ListingModel } from "./listing.model";
import AppError from "../../Error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";

const createListingInDB = async (payload: TListing, id: Types.ObjectId) => {
    payload.userID = id
    const result = await ListingModel.create(payload)
    return result
}
const allListingProduct = async (query:Record<string,unknown>) => {

    const productQuery = new QueryBuilder(ListingModel.find().populate("userID"),query).search(["title","address"])

    const result = await productQuery.modelQuery
    return result
}

const productDetails=async(id:string)=>{
    const result = await ListingModel.findById(id)
    return result
}
const updateProduct = async (id: string, payload: Partial<TListing>, userId: Types.ObjectId) => {
    // Check if the product exists
    const isProductExist = await ListingModel.findById(id);
    if (!isProductExist) {
        throw new AppError(404, "This product not found");
    }

    // Check if the user is the owner of the product
    if (!isProductExist.userID.equals(userId)) {  
        throw new AppError(403, "You are not authorized");
    }

    // Separate images from other data
    const { images, ...otherData } = payload;

    
    const result = await ListingModel.findByIdAndUpdate(
        id,
        { ...otherData, ...(images ? { $set: { images } } : {}) , }, 
        { new: true ,upsert:true }
    );

    return result;
};
const deleteProduct = async (id: string, userId: Types.ObjectId) => {
    // Check if the product exists
    const isProductExist = await ListingModel.findById(id);
    if (!isProductExist) {
        throw new AppError(404, "This product not found");
    }

    // Check if the user is the owner of the product
    if (!isProductExist.userID.equals(userId)) {  
        throw new AppError(403, "You are not authorized");
    }

    // Separate images from other data
    const result= await ListingModel.findByIdAndDelete(id)

    return result;
};
const adminDeleteProduct = async (id: string) => {
    // Check if the product exists
    const isProductExist = await ListingModel.findById(id);
    if (!isProductExist) {
        throw new AppError(404, "This product not found");
    }

    
    // Separate images from other data
    const result= await ListingModel.findByIdAndDelete(id)

    return result;
};

const myListing = async (id:Types.ObjectId) => {

    const result = await ListingModel.find({userID:id}).populate("userID")
    return result
}













export const listingServices = {
    createListingInDB,
    allListingProduct,
    productDetails,
    updateProduct,
    deleteProduct,
    adminDeleteProduct,
    myListing
}