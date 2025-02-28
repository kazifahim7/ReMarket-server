import config from "../../config";
import AppError from "../../Error/AppError";
import { IUser } from "./auth.interface";
import { userModel } from "./auth.model";

import bcrypt from 'bcrypt'

const registerIntoDB = async (payload: IUser) => {
    const isUserALreadyExist = await userModel.findOne({ email: payload.email })
    if (isUserALreadyExist) {
        throw new AppError(500, "you are already a registered Person. please log in .");

    }
    // hash password
    payload.password = await bcrypt.hash(payload.password,Number(config.salt_round))


    const res = await userModel.create(payload)



}

export const authServices={
    registerIntoDB
}