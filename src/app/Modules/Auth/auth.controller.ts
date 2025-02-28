import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const register = catchAsync(async (req, res) => {
    const result = await authServices.registerIntoDB(req.body);

    res.status(200).json({
        success:true,
        message:"register successful",
        data: result
    })
})
const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUser(req.body);

    res.status(200).json({
        success:true,
        message:"register successful",
        data: result
    })
})



export const authController={
    register,
    loginUser
}