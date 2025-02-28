export type IUser = {
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: "user" | "admin",
    isBlocked: boolean
}