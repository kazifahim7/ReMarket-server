import catchAsync from "../../utils/catchAsync";
import { listingServices } from "./listing.services";

const createListing = catchAsync(async(req,res)=>{
    const result= await listingServices.createListingInDB(req?.body,req.user.id)
    res.status(200).json({
        success:true,
        message:"Product creation successful",
        data:result
    })
})
const allListingProduct = catchAsync(async(req,res)=>{
    const result= await listingServices.allListingProduct(req.query)
    res.status(200).json({
        success:true,
        message:"All product Retrieved successful",
        data:result
    })
})
const productDetails = catchAsync(async(req,res)=>{
    const result= await listingServices.productDetails(req.params.id)
    res.status(200).json({
        success:true,
        message:"product Retrieved successful",
        data:result
    })
})
const updateProduct = catchAsync(async(req,res)=>{
    const result = await listingServices.updateProduct(req.params.id,req.body,req.user.id)
    res.status(200).json({
        success:true,
        message:"product update successful",
        data:result
    })
})
const deleteProduct = catchAsync(async(req,res)=>{
    const result = await listingServices.deleteProduct(req.params.id,req.user.id)
    res.status(200).json({
        success:true,
        message:"product delete successful",
        data:result
    })
})
const adminDeleteProduct = catchAsync(async(req,res)=>{
    const result = await listingServices.adminDeleteProduct(req.params.id)
    res.status(200).json({
        success:true,
        message:"product delete successful",
        data:result
    })
})


const mylisting = catchAsync(async (req, res) => {
    const result = await listingServices.myListing(req?.user?.id)
    res.status(200).json({
        success: true,
        message: "All product Retrieved successful",
        data: result
    })
})










export const listingController={
    createListing,
    allListingProduct,
    productDetails,
    updateProduct,
    deleteProduct,
    adminDeleteProduct, mylisting
}