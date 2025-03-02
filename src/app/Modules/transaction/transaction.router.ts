import express from 'express'
import auth from '../../middleware/auth'
import { transactionController } from './transaction.controller'

const router = express.Router()

router.post('/transactions',auth("admin","user"),transactionController.createTransaction)











export const transactionRouter = router