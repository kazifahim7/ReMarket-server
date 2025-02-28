import { model, Schema } from "mongoose";
import { IUser } from "./auth.interface";

const userSchema = new Schema<IUser>({
    name: { type: String, required: [true, "name is required"] },
    email: { type: String, required: [true, "email is required"], unique: true },
    phoneNumber: { type: String, required: [true, "Phone number  is required"] },
    password: { type: String, required: [true, "password   is required"], unique: true },
    role: { type: String, enum: ["user", "admin"], default: 'user' },
    isBlocked: { type: Boolean, default: false }

})

export const userModel = model<IUser>("user", userSchema)