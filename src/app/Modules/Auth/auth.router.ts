import express from 'express'
import validateRequest from '../../middleware/validation'
import { registerValidation } from './auth.validation'
import { authController } from './auth.controller'

const router = express.Router()

router.post('/register',validateRequest(registerValidation),authController.register)
router.post('/login',authController.loginUser)






export const authRouter = router