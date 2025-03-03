import express from 'express'
import auth from '../../middleware/auth'
import { transactionController } from './transaction.controller'

const router = express.Router()

router.post('/transactions',auth("admin","user"),transactionController.createTransaction)

//! sales data and purchase data api 
router.get('/sales',auth("user"),transactionController.mySales)
router.get('/purchases',auth("user"),transactionController.myPurchases)


//! update status api
router.put('/transactions/:id',auth("user"),transactionController.changeStatus)












export const transactionRouter = router