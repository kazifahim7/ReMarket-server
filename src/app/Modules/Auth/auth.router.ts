import express from 'express'
import validateRequest from '../../middleware/validation'
import { registerValidation } from './auth.validation'
import { authController } from './auth.controller'
import auth from '../../middleware/auth'

const router = express.Router()

router.post('/register',validateRequest(registerValidation),authController.register)
router.post('/login',authController.loginUser)
router.get("/user/:id",authController.singleUser)


// admin routes

router.get('/all-user',auth("admin"),authController.allUser)
router.post('/block-user/:id',auth("admin"),authController.blockUser)








export const authRouter = router