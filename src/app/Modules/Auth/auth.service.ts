import config from "../../config";
import AppError from "../../Error/AppError";
import { IUser } from "./auth.interface";
import { userModel } from "./auth.model";
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

const registerIntoDB = async (payload: IUser) => {
    const isUserALreadyExist = await userModel.findOne({ email: payload.email })
    if (isUserALreadyExist) {
        throw new AppError(500, "you are already a registered Person. please log in .");

    }
    // hash password
    payload.password = await bcrypt.hash(payload.password, Number(config.salt_round))


    const res = await userModel.create(payload)

    return res

}


const loginUser = async (payload: Pick<IUser, "password" | "email">) => {
    const isUserExist = await userModel.findOne({ email: payload.email })
    if (!isUserExist) {
        throw new AppError(404, "This user Not Found");

    }
    if (isUserExist.isBlocked) {
        throw new AppError(403, "This User is blocked");
    }
    const isPassIsOk = await bcrypt.compare(payload?.password, isUserExist?.password)

    if (!isPassIsOk) {
        throw new AppError(401, "This password  is invalid");
    }
    const user = {
        id: isUserExist?._id,
        role: isUserExist?.role,
        email: isUserExist?.email
    }
    const token = jwt.sign(user, config.jwt_secret as string, { expiresIn: "30d" })

    return {
        token
    }


}

const allUser = async () => {
    const result = await userModel.find().select("-password")
    return result
}

const singleUser = async (id: string) => {
    const result = await userModel.findById(id).select("-password")
    return result
}
const blockUser = async (id: string) => {
    const result = await userModel.findByIdAndUpdate(id,{isBlocked:true},{new:true})
    return result
}



const updateProfile=async(id:string,payload:Partial<IUser>)=>{
    const result = await userModel.findByIdAndUpdate(id,payload,{new:true})
    return result

}
const deleteProfile=async(id:string)=>{
    const result = await userModel.findByIdAndDelete(id)
    return result

}











export const authServices = {
    registerIntoDB,
    loginUser,
    allUser,
    singleUser,
    blockUser,
    updateProfile,
    deleteProfile
}