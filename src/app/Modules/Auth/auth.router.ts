import express from 'express'
import validateRequest from '../../middleware/validation'
import { registerValidation } from './auth.validation'
import { authController } from './auth.controller'

const router = express.Router()

router.post('/register',validateRequest(registerValidation),authController.register)






export const authRouter = router