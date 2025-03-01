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
        message:"login successful",
        data: result
    })
})
const allUser = catchAsync(async (req, res) => {
    const result = await authServices.allUser();

    res.status(200).json({
        success:true,
        message:"all user retrieved successful",
        data: result
    })
})
const singleUser = catchAsync(async (req, res) => {
    const result = await authServices.singleUser(req.params.id);

    res.status(200).json({
        success:true,
        message:"user retrieved successful",
        data: result
    })
})
const blockUser = catchAsync(async (req, res) => {
    const result = await authServices.blockUser(req.params.id);

    res.status(200).json({
        success:true,
        message:"block successful",
        data: result
    })
})
const updateProfile = catchAsync(async (req, res) => {
    const result = await authServices.updateProfile(req.params.id,req.body);

    res.status(200).json({
        success:true,
        message:"update successful",
        data: result
    })
})
const deleteProfile = catchAsync(async (req, res) => {
    const result = await authServices.deleteProfile(req.params.id,);

    res.status(200).json({
        success:true,
        message:"delete  successful",
        data: result
    })
})



export const authController={
    register,
    loginUser,
    allUser,
    singleUser,
    blockUser,
    updateProfile,
    deleteProfile
}