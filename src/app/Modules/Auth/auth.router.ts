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



// user management

router.put("/user/:id",auth("admin","user"), authController.updateProfile)
router.delete("/user/:id",auth("admin","user"), authController.deleteProfile)










export const authRouter = router