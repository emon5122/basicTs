import z from "zod"

export const schema = z.object({
    firstName: z.string().min(10),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})

export type userSchema = z.infer<typeof schema>
