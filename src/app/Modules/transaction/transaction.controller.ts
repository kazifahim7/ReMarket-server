import catchAsync from "../../utils/catchAsync";
import { transactionService } from "./transaction.services";

const createTransaction = catchAsync(async (req, res) => {
    const result = await transactionService.createTransactionInDB(req.body,req.user.id)

        res.status(200).json({
            success: true,
            message: "Transaction successful",
            data: result
        })
})


const mySales=catchAsync(async(req,res)=>{
    const result = await transactionService.mySales(req.user.id)

    res.status(200).json({
        success: true,
        message: "sales data retrieved successful",
        data: result
    })
})
const myPurchases=catchAsync(async(req,res)=>{
    const result = await transactionService.myPurchases(req.user.id)

    res.status(200).json({
        success: true,
        message: "purchases data retrieved successful",
        data: result
    })
})
const changeStatus=catchAsync(async(req,res)=>{
    const result = await transactionService.updateTranStatus(req.params.id)

    res.status(200).json({
        success: true,
        message: "purchases data retrieved successful",
        data: result
    })
})








export const transactionController ={
    createTransaction,
    mySales,
    myPurchases,
    changeStatus
}