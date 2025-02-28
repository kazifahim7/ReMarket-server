import { z } from "zod";

export const registerValidation=z.object({
    body:z.object({
        name:z.string(),
        email:z.string().email(),
        phoneNumber:z.string(),
        password:z.string()
    })
})