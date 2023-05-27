import { z } from "zod";
export const userData = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
});
export type userData = z.infer<typeof userData>;
