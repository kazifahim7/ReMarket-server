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








export const transactionController ={
    createTransaction
}