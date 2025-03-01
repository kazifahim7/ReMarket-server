import { z } from "zod";


export const ListingValidationSchema = z.object({
    body:z.object({
        title: z.string(),
        description: z.string(),
        price: z.string(),
        condition: z.string(),
        images: z.array(z.string().url("Each image must be a valid URL")),
        status: z.enum(["available", "sold"]).default("available"),
    })
});
